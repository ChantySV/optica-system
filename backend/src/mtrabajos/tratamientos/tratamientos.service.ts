import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';

import { Tratamiento } from './entities/tratamiento.entity';
import { CreateTratamientoDto } from './dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';

@Injectable()
export class TratamientosService {
  constructor(
    @InjectRepository(Tratamiento)
    private readonly tratamientoRepository: Repository<Tratamiento>,
    private readonly errorHandleService: ErrorHandleService,
  ) {}

  // Crear un nuevo tratamiento
  async create(createTratamientoDto: CreateTratamientoDto): Promise<Tratamiento> {
    try {
      const tratamiento = this.tratamientoRepository.create(createTratamientoDto);
      return await this.tratamientoRepository.save(tratamiento);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Obtener todos los tratamientos activos
  async findAll(): Promise<Tratamiento[]> {
    try {
      return await this.tratamientoRepository.find({ where: { activo: true } });
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Obtener un tratamiento por ID
  async findOne(id: string): Promise<Tratamiento> {
    try {
      const tratamiento = await this.tratamientoRepository.findOneOrFail({
        where: { id_tratamiento: id, activo: true },
      });

      return tratamiento;
    } catch (error) {
      if (error.name === 'EntityNotFound') {
        throw new NotFoundException(`Tratamiento con ID "${id}" no encontrado`);
      }
      this.errorHandleService.errorHandle(error);
    }
  }

  // Actualizar un tratamiento
  async update(id: string, updateTratamientoDto: UpdateTratamientoDto): Promise<Tratamiento> {
    try {
      const tratamiento = await this.tratamientoRepository.preload({
        id_tratamiento: id,
        ...updateTratamientoDto,
      });

      if (!tratamiento) {
        throw new NotFoundException(`Tratamiento con ID "${id}" no encontrado`);
      }

      return await this.tratamientoRepository.save(tratamiento);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Desactivar (eliminar lógicamente) un tratamiento
  async remove(id: string): Promise<Tratamiento> {
    try {
      const tratamiento = await this.findOne(id);

      tratamiento.activo = false; // Desactivación lógica
      return await this.tratamientoRepository.save(tratamiento);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }
}
