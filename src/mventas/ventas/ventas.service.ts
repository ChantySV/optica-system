import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';

import { Venta } from './entities/venta.entity';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
    private readonly errorHandleService: ErrorHandleService,
  ) {}

  // Crear una nueva venta
  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    try {
      const venta = this.ventaRepository.create(createVentaDto);
      return await this.ventaRepository.save(venta);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Obtener todas las ventas activas
  async findAll(): Promise<Venta[]> {
    try {
      return await this.ventaRepository.find({
        where: { activo: true },
        relations: ['optica', 'usuario', 'detalleVentas'], // Relaciones necesarias
      });
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Obtener una venta por ID
  async findOne(id: string): Promise<Venta> {
    try {
      const venta = await this.ventaRepository.findOne({
        where: { id_venta: id, activo: true },
        relations: ['optica', 'usuario', 'detalleVentas'],
      });

      if (!venta) {
        throw new NotFoundException(`Venta con ID "${id}" no encontrada`);
      }

      return venta;
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Actualizar una venta
  async update(id: string, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    try {
      const venta = await this.ventaRepository.preload({
        id_venta: id,
        ...updateVentaDto,
      });

      if (!venta) {
        throw new NotFoundException(`Venta con ID "${id}" no encontrada`);
      }

      return await this.ventaRepository.save(venta);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Desactivar (eliminar lógicamente) una venta
  async remove(id: string): Promise<Venta> {
    try {
      const venta = await this.findOne(id);

      venta.activo = false;
      return await this.ventaRepository.save(venta);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }
}
