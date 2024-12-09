import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';

import { Optica } from './entities/optica.entity';
import { CreateOpticaDto } from './dto/create-optica.dto';
import { UpdateOpticaDto } from './dto/update-optica.dto';

@Injectable()
export class OpticasService {
  constructor(
    @InjectRepository(Optica)
    private readonly opticaRepository: Repository<Optica>,
    private readonly errorHandleService: ErrorHandleService,
  ) {}

  // Crear una nueva óptica
  async create(createOpticaDto: CreateOpticaDto): Promise<Optica> {
    try {
      const optica = this.opticaRepository.create(createOpticaDto);
      return await this.opticaRepository.save(optica);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Obtener todas las ópticas activas
  async findAll(): Promise<Optica[]> {
    try {
      return await this.opticaRepository.find({ where: { activo: true } });
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Obtener una óptica por ID
  async findOne(id: string): Promise<Optica> {
    try {
      const optica = await this.opticaRepository.findOne({
        where: { id_optica: id, activo: true },
      });

      if (!optica) {
        throw new NotFoundException(`Óptica con ID "${id}" no encontrada`);
      }

      return optica;
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Actualizar una óptica
  async update(id: string, updateOpticaDto: UpdateOpticaDto): Promise<Optica> {
    try {
      const optica = await this.opticaRepository.preload({
        id_optica: id,
        ...updateOpticaDto,
      });

      if (!optica) {
        throw new NotFoundException(`Óptica con ID "${id}" no encontrada`);
      }

      return await this.opticaRepository.save(optica);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Desactivar (eliminar lógicamente) una óptica
  async remove(id: string): Promise<Optica> {
    try {
      const optica = await this.findOne(id);
      optica.activo = false; // Desactivación lógica
      return await this.opticaRepository.save(optica);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }
}
