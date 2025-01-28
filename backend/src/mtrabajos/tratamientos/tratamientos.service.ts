import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, Like } from 'typeorm';
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

  async create(createTratamientoDto: CreateTratamientoDto): Promise<{ ok: boolean; data: Tratamiento; message?: string }> {
    try {
      const existing = await this.tratamientoRepository.findOne({ where: { nombre: createTratamientoDto.nombre } });
      if (existing) {
        throw new ConflictException('El nombre del tratamiento ya está en uso.');
      }

      const tratamiento = this.tratamientoRepository.create(createTratamientoDto);
      const saved = await this.tratamientoRepository.save(tratamiento);

      return {
        ok: true,
        data: saved,
      };
    } catch (error) {
      this.errorHandleService.errorHandle(error);
      return {
        ok: false,
        data: null,
        message: error.message || 'Error al crear el tratamiento.',
      };
    }
  }

  // Obtener todos los tratamientos activos
  async findAll(query: any): Promise<{ ok: boolean; data: Tratamiento[]; total: number; message?: string }> {
    try {
      const { page = 1, limit = 10, sortBy = 'nombre', order = 'ASC', filters } = query;

      const findOptions: FindManyOptions<Tratamiento> = {
        where: {},
        order: {
          [sortBy]: order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
        },
        skip: (page - 1) * limit,
        take: limit,
      };

      if (filters && filters.nombre) {
        findOptions.where = {
          ...findOptions.where,
          nombre: Like(`%${filters.nombre}%`),
        };
      }

      const [data, total] = await this.tratamientoRepository.findAndCount(findOptions);

      return {
        ok: true,
        data,
        total,
      };
    } catch (error) {
      this.errorHandleService.errorHandle(error);
      throw error;
    }
  }

  //Solo Nombre
  async findTratamiento() {
    try {
      return await this.tratamientoRepository.find(
        {
          where: { activo: true },
          select: ['id_tratamiento', 'nombre']
        });
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
  async update(id: string, updateTratamientoDto: UpdateTratamientoDto) {
    try {
      const tratamiento = await this.tratamientoRepository.preload({
        id_tratamiento: id,
        ...updateTratamientoDto,
      });

      if (!tratamiento) {
        throw new NotFoundException(`Tratamiento con ID "${id}" no encontrado`);
      }
      await this.tratamientoRepository.save(tratamiento);

      return{
        ok:true, 
        ...tratamiento
      }
    } catch (error) {
      this.errorHandleService.errorHandle(error);
      return
    }
  }

  // Desactivar (eliminar lógicamente) un tratamiento
  async remove(id: string) {

    const tratamiento = await this.findOne(id);
    if (!tratamiento) {
      throw new NotFoundException(`Personal con ID "${id}" no encontrado`);
    }
    tratamiento.activo = !tratamiento.activo; 
    const updatedTratamiento = await this.tratamientoRepository.save(tratamiento);
    return { ok: true, data: updatedTratamiento };
  }

}
