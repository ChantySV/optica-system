import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';
import { DetalleTrabajo } from './entities/detalle-trabajo.entity';
import { CreateDetalleTrabajoDto } from './dto/create-detalle-trabajo.dto';
import { UpdateDetalleTrabajoDto } from './dto/update-detalle-trabajo.dto';

@Injectable()
export class DetalleTrabajosService {
  constructor(
    @InjectRepository(DetalleTrabajo)
    private readonly detalleTrabajoRepository: Repository<DetalleTrabajo>,
    private readonly errorHandleService: ErrorHandleService,
  ) {}

  // Crear un nuevo detalle de trabajo
  async create(createDetalleTrabajoDto: CreateDetalleTrabajoDto): Promise<DetalleTrabajo> {
    try {
      const detalleTrabajo = this.detalleTrabajoRepository.create(createDetalleTrabajoDto);
      return await this.detalleTrabajoRepository.save(detalleTrabajo);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Obtener todos los detalles de trabajo
  async findAll(): Promise<DetalleTrabajo[]> {
    try {
      return await this.detalleTrabajoRepository.find({
        relations: ['tratamiento', 'producto', 'color'], // Incluir relaciones si son necesarias
      });
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Obtener un detalle de trabajo por ID
  async findOne(id: string): Promise<DetalleTrabajo> {
    try {
      const detalleTrabajo = await this.detalleTrabajoRepository.findOne({
        where: { id_detalleTrabajo: id },
        relations: ['tratamiento', 'producto', 'color'],
      });

      if (!detalleTrabajo) {
        throw new NotFoundException(`DetalleTrabajo con ID "${id}" no encontrado`);
      }

      return detalleTrabajo;
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Actualizar un detalle de trabajo
  async update(
    id: string,
    updateDetalleTrabajoDto: UpdateDetalleTrabajoDto,
  ): Promise<DetalleTrabajo> {
    try {
      const detalleTrabajo = await this.detalleTrabajoRepository.preload({
        id_detalleTrabajo: id,
        ...updateDetalleTrabajoDto,
      });

      if (!detalleTrabajo) {
        throw new NotFoundException(`DetalleTrabajo con ID "${id}" no encontrado`);
      }

      return await this.detalleTrabajoRepository.save(detalleTrabajo);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Eliminar un detalle de trabajo (opcional: desactivación lógica)
//   async remove(id: string): Promise<void> {
//     try {
//       const detalleTrabajo = await this.findOne(id);
//       await this.detalleTrabajoRepository.remove(detalleTrabajo);
//     } catch (error) {
//       this.errorHandleService.errorHandle(error);
//     }
//   }
}
