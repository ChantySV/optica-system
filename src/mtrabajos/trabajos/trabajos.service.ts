import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';

import { Trabajo } from './entities/trabajo.entity';
import { DetalleTrabajo } from './entities/detalle-trabajo.entity';
import { Personal } from 'src/personal/entities/personal.entity';

import { CreateTrabajoDto } from './dto/create-trabajo.dto';
import { UpdateTrabajoDto } from './dto/update-trabajo.dto';

@Injectable()
export class TrabajosService {
  constructor(
    @InjectRepository(Trabajo)
    private readonly trabajoRepository: Repository<Trabajo>,

    @InjectRepository(DetalleTrabajo)
    private readonly detalleTrabajoRepository: Repository<DetalleTrabajo>,

    @InjectRepository(Personal)
    private readonly personalRepository: Repository<Personal>,

    private readonly errorHandleService: ErrorHandleService,
  ) {}

  // Crear un nuevo trabajo
  async create(createTrabajoDto: CreateTrabajoDto): Promise<Trabajo> {
    try {
      const { id_personal, detalleTrabajo, ...trabajoData } = createTrabajoDto;

      // Verificar Personal
      const personal = await this.personalRepository.findOne({
        where: { id_personal, activo: true },
      });
      if (!personal) {
        throw new NotFoundException(`Personal con ID "${id_personal}" no encontrado`);
      }

      // Crear DetalleTrabajo
      const detalle = this.detalleTrabajoRepository.create(detalleTrabajo);
      const savedDetalle = await this.detalleTrabajoRepository.save(detalle);

      // Crear Trabajo
      const trabajo = this.trabajoRepository.create({
        ...trabajoData,
        detalleTrabajo: savedDetalle,
        personal,
      });
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
        relations: ['detalleTrabajo', 'personal'],
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
      const { id_personal, detalleTrabajo, ...trabajoData } = updateTrabajoDto;

      // Verificar si el trabajo existe
      const trabajo = await this.findOne(id);

      // Verificar y asociar nuevo Personal si se proporciona
      if (id_personal) {
        const personal = await this.personalRepository.findOne({
          where: { id_personal, activo: true },
        });
        if (!personal) {
          throw new NotFoundException(`Personal con ID "${id_personal}" no encontrado`);
        }
        trabajo.personal = personal;
      }

      // Actualizar DetalleTrabajo si se proporciona
      if (detalleTrabajo) {
        const detalle = await this.detalleTrabajoRepository.preload({
          id_detalleTrabajo: trabajo.detalleTrabajo.id_detalleTrabajo,
          ...detalleTrabajo,
        });

        if (!detalle) {
          throw new NotFoundException(
            `DetalleTrabajo con ID "${trabajo.detalleTrabajo.id_detalleTrabajo}" no encontrado`,
          );
        }
        await this.detalleTrabajoRepository.save(detalle);
      }

      // Actualizar Trabajo
      const updatedTrabajo = await this.trabajoRepository.save({
        ...trabajo,
        ...trabajoData,
      });

      return updatedTrabajo;
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
