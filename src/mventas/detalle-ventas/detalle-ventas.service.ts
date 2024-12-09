import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';

import { DetalleVenta } from './entities/detalle-venta.entity';
import { CreateDetalleVentaDto } from './dto/create-detalle-venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle-venta.dto';

@Injectable()
export class DetalleVentasService {
  constructor(
    @InjectRepository(DetalleVenta)
    private readonly detalleVentaRepository: Repository<DetalleVenta>,
    private readonly errorHandleService: ErrorHandleService,
  ) {}

  async create(createDetalleVentaDto: CreateDetalleVentaDto): Promise<DetalleVenta> {
    try {
      const detalleVenta = this.detalleVentaRepository.create(createDetalleVentaDto);
      return await this.detalleVentaRepository.save(detalleVenta);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async findAll(): Promise<DetalleVenta[]> {
    try {
      return await this.detalleVentaRepository.find({
        relations: ['venta', 'trabajo'],
      });
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async findOne(id: string): Promise<DetalleVenta> {
    try {
      const detalleVenta = await this.detalleVentaRepository.findOne({
        where: { id_detalleVenta: id },
        relations: ['venta', 'trabajo'],
      });

      if (!detalleVenta) {
        throw new NotFoundException(`DetalleVenta con ID "${id}" no encontrado`);
      }

      return detalleVenta;
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async update(id: string, updateDetalleVentaDto: UpdateDetalleVentaDto): Promise<DetalleVenta> {
    try {
      const detalleVenta = await this.detalleVentaRepository.preload({
        id_detalleVenta: id,
        ...updateDetalleVentaDto,
      });

      if (!detalleVenta) {
        throw new NotFoundException(`DetalleVenta con ID "${id}" no encontrado`);
      }

      return await this.detalleVentaRepository.save(detalleVenta);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // async remove(id: string): Promise<DetalleVenta> {
  //   try {
  //     const detalleVenta = await this.findOne(id);
  //     detalleVenta.activo = false;
  //     return await this.detalleVentaRepository.save(detalleVenta);
  //   } catch (error) {
  //     this.errorHandleService.errorHandle(error);
  //   }
  // }
}
