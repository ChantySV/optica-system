import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from './entities/proveedore.entity';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
    private readonly errorHandleService: ErrorHandleService,
  ) {}

  async create(createProveedoreDto: CreateProveedoreDto): Promise<Proveedor> {
    try {
      const proveedor = this.proveedorRepository.create(createProveedoreDto);
      return await this.proveedorRepository.save(proveedor);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async findAll(): Promise<Proveedor[]> {
    try {
      return await this.proveedorRepository.find({
        where: { activo: true },
        relations: ['productosProveedores'],
      });
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async findOne(id: string): Promise<Proveedor> {
    try {
      const proveedor = await this.proveedorRepository.findOne({
        where: { id_proveedor: id, activo: true },
        relations: ['productosProveedores'],
      });

      if (!proveedor) {
        throw new NotFoundException(`Proveedor con ID "${id}" no encontrado`);
      }

      return proveedor;
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async update(id: string, updateProveedoreDto: UpdateProveedoreDto): Promise<Proveedor> {
    try {
      const proveedor = await this.proveedorRepository.preload({
        id_proveedor: id,
        ...updateProveedoreDto,
      });

      if (!proveedor) {
        throw new NotFoundException(`Proveedor con ID "${id}" no encontrado`);
      }

      return await this.proveedorRepository.save(proveedor);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async remove(id: string): Promise<Proveedor> {
    try {
      const proveedor = await this.findOne(id);
      proveedor.activo = false; // Desactivación lógica
      return await this.proveedorRepository.save(proveedor);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }
}
