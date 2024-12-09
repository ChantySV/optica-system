import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';

import { Trabajo } from './entities/trabajo.entity';
import { CreateTrabajoDto } from './dto/create-trabajo.dto';
import { UpdateTrabajoDto } from './dto/update-trabajo.dto';

@Injectable()
export class TrabajosService {
  constructor(
    @InjectRepository(Trabajo)
    private readonly trabajoRepository: Repository<Trabajo>,
    private readonly errorHandleService: ErrorHandleService,
  ) {}

  // Crear un nuevo trabajo
  async create(createTrabajoDto: CreateTrabajoDto): Promise<Trabajo> {
    try {
      const trabajo = this.trabajoRepository.create(createTrabajoDto);
      return await this.trabajoRepository.save(trabajo);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Obtener todos los trabajos activos
  async findAll(): Promise<Trabajo[]> {
    try {
      return await this.trabajoRepository.find({
        where: { activo: true },
        relations: ['detalleTrabajo', 'personal'], // Incluye relaciones necesarias
      });
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Obtener un trabajo por ID
  async findOne(id: string): Promise<Trabajo> {
    try {
      const trabajo = await this.trabajoRepository.findOne({
        where: { id_trabajo: id, activo: true },
        relations: ['detalleTrabajo', 'personal'],
      });

      if (!trabajo) {
        throw new NotFoundException(`Trabajo con ID "${id}" no encontrado`);
      }

      return trabajo;
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Actualizar un trabajo
  async update(id: string, updateTrabajoDto: UpdateTrabajoDto): Promise<Trabajo> {
    try {
      const trabajo = await this.trabajoRepository.preload({
        id_trabajo: id,
        ...updateTrabajoDto,
      });

      if (!trabajo) {
        throw new NotFoundException(`Trabajo con ID "${id}" no encontrado`);
      }

      return await this.trabajoRepository.save(trabajo);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Desactivar (eliminar lógicamente) un trabajo
  async remove(id: string): Promise<Trabajo> {
    try {
      const trabajo = await this.findOne(id);

      trabajo.activo = false; 
      return await this.trabajoRepository.save(trabajo);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }
}
