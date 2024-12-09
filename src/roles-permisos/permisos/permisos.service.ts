import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permiso } from './entities/permiso.entity';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';

@Injectable()
export class PermisosService {
  constructor(
    @InjectRepository(Permiso)
    private readonly permisoRepository: Repository<Permiso>,
    private readonly errorHandleService: ErrorHandleService,
  ) {}

  async create(createPermisoDto: CreatePermisoDto): Promise<Permiso> {
    try {
      const permiso = this.permisoRepository.create(createPermisoDto);
      return await this.permisoRepository.save(permiso);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async findAll(): Promise<Permiso[]> {
    try {
      return await this.permisoRepository.find({
        where: { activo: true },
        relations: ['rolePermisos'],
      });
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async findOne(id: string): Promise<Permiso> {
    try {
      const permiso = await this.permisoRepository.findOne({
        where: { id_permiso: id, activo: true },
        relations: ['rolePermisos'],
      });

      if (!permiso) {
        throw new NotFoundException(`Permiso con ID "${id}" no encontrado`);
      }

      return permiso;
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async update(id: string, updatePermisoDto: UpdatePermisoDto): Promise<Permiso> {
    try {
      const permiso = await this.permisoRepository.preload({
        id_permiso: id,
        ...updatePermisoDto,
      });

      if (!permiso) {
        throw new NotFoundException(`Permiso con ID "${id}" no encontrado`);
      }

      return await this.permisoRepository.save(permiso);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async remove(id: string): Promise<Permiso> {
    try {
      const permiso = await this.findOne(id);
      permiso.activo = false; 
      return await this.permisoRepository.save(permiso);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }
}
