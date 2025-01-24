import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';

import { Trabajo } from './entities/trabajo.entity';
import { DetalleTrabajo } from './entities/detalle-trabajo.entity';
import { Personal } from 'src/personal/entities/personal.entity';

import { CreateTrabajoDto } from './dto/create-trabajo.dto';
import { UpdateTrabajoDto } from './dto/update-trabajo.dto';
import { PaginationDto } from 'src/common/pagination-dto';
import { Producto } from 'src/proveedores-productos/productos/entities/producto.entity';
import { QueryGetDto } from 'src/common/QueryGet-dto';
import { QueryTrabajoDto } from './dto/query-response-trabajo.dto';
import { Color } from '../colores/entities/colore.entity';
import { Tratamiento } from '../tratamientos/entities/tratamiento.entity';

@Injectable()
export class TrabajosService {
  constructor(
    @InjectRepository(Trabajo)
    private readonly trabajoRepository: Repository<Trabajo>,

    @InjectRepository(DetalleTrabajo)
    private readonly detalleTrabajoRepository: Repository<DetalleTrabajo>,

    @InjectRepository(Personal)
    private readonly personalRepository: Repository<Personal>,

    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,

    @InjectRepository(Tratamiento)
    private readonly tratamientoRepository: Repository<Tratamiento>,

    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    private readonly errorHandleService: ErrorHandleService,
  ) {}

  // Crear un nuevo trabajo
  async create(createTrabajoDto: CreateTrabajoDto) {
    try {
      const { id_personal, detalleTrabajo, ...trabajoData } = createTrabajoDto;
  
      // Verificar si el personal existe
      const personal = await this.personalRepository.findOne({
        where: { id_personal, activo: true },
      });
      if (!personal) {
        throw new NotFoundException(`Personal con ID "${id_personal}" no encontrado`);
      }
  
      // Verificar si el producto existe
      const producto = await this.productoRepository.findOne({
        where: { id_producto: detalleTrabajo.id_producto },
      });
      if (!producto) {
        throw new NotFoundException(`Producto con ID "${detalleTrabajo.id_producto}" no encontrado`);
      }
  
      // Verificar si el color existe (si se proporciona)
      let color = null;
      if (detalleTrabajo.id_color) {
        color = await this.colorRepository.findOne({
          where: { id_color: detalleTrabajo.id_color },
        });
        if (!color) {
          throw new NotFoundException(`Color con ID "${detalleTrabajo.id_color}" no encontrado`);
        }
      }
  
      // Verificar si el tratamiento existe (si se proporciona)
      let tratamiento = null;
      if (detalleTrabajo.id_tratamiento) {
        tratamiento = await this.tratamientoRepository.findOne({
          where: { id_tratamiento: detalleTrabajo.id_tratamiento },
        });
        if (!tratamiento) {
          throw new NotFoundException(`Tratamiento con ID "${detalleTrabajo.id_tratamiento}" no encontrado`);
        }
      }
  
      // Crear y guardar el detalle de trabajo, incluyendo color y tratamiento si se proporcionan
      const detalle = this.detalleTrabajoRepository.create({
        ...detalleTrabajo,
        producto,
        color,  // Asignamos el color si existe
        tratamiento,  // Asignamos el tratamiento si existe
      });
      const savedDetalle = await this.detalleTrabajoRepository.save(detalle);
  
      // Crear y guardar el trabajo
      const trabajo = this.trabajoRepository.create({
        ...trabajoData,
        detalleTrabajo: savedDetalle,
        personal,
      });
      const savedTrabajo = await this.trabajoRepository.save(trabajo);
  
      // Reducir el stock del producto en 2
      if (producto.stock >= 2) {
        producto.stock -= 2;  // Reducir el stock en 2
        await this.productoRepository.save(producto);  // Guardar el producto con el stock actualizado
      } else {
        throw new Error(`No hay suficiente stock para realizar el trabajo.`);
      }
  
      return savedTrabajo;
    } catch (error) {
      console.log(error);
      this.errorHandleService.errorHandle(error);
      throw new Error('No se pudo crear el trabajo correctamente.');
    }
  }  
  
  async findAll(paginationDto: PaginationDto, queryGetDto: QueryGetDto, queryTrabajoDto: QueryTrabajoDto) {
    const { limit, offset } = paginationDto;
    const { order = 'ASC' } = queryGetDto;
    const { sortBy = 'numero_trabajo' } = queryTrabajoDto;
  
    try {
      // Realizar la consulta usando leftJoinAndSelect para obtener los detalles de las relaciones
      const [trabajos, total] = await this.trabajoRepository.createQueryBuilder('trabajo')
        .leftJoinAndSelect('trabajo.detalleTrabajo', 'detalleTrabajo')
        .leftJoinAndSelect('detalleTrabajo.producto', 'producto')
        .leftJoinAndSelect('detalleTrabajo.tratamiento', 'tratamiento')
        .leftJoinAndSelect('detalleTrabajo.color', 'color')
        .leftJoinAndSelect('trabajo.personal', 'personal')
        .where('trabajo.activo = :activo', { activo: true })
        .take(limit)
        .skip(offset)
        .orderBy(`trabajo.${sortBy}`, order)
        .getManyAndCount();
  
      // Formatear la respuesta

  
      return {
        trabajos,
        total,
      };
    } catch (error) {
      this.errorHandleService.errorHandle(error);
      throw new Error('Error al obtener los trabajos.');
    }
  }
  

  async findDetalleTrabajo(id: string) {    
    try {      
      const detalle = await this.detalleTrabajoRepository.find({
        where: { id_detalleTrabajo: id },
        relations: ['producto', 'color', 'tratamiento'],
      });
  
      // Mapeo para extraer solo la información relevante
      const data = detalle.map(tra => ({
        id_detalleTrabajo: tra.id_detalleTrabajo,
        distancia: tra.distancia,
        esferico_derecho: tra.esferico_derecho,
        esferico_izquierdo: tra.esferico_izquierdo,
        cilindro_derecho: tra.cilindro_derecho,
        cilindro_izquierdo: tra.cilindro_izquierdo,
        eje_derecho: tra.eje_derecho,
        eje_izquierdo: tra.eje_izquierdo,
        prisma_izquierdo: tra.prisma_izquierdo,
        prisma_derecho: tra.prisma_derecho,
        base_izquierdo: tra.base_izquierdo,
        base_derecho: tra.base_derecho,
        adicion_izquierdo: tra.adicion_izquierdo,
        adicion_derecho: tra.adicion_derecho,
        altura_izquierdo: tra.altura_izquierdo,
        altura_derecho: tra.altura_derecho,
        dip_izquierdo: tra.dip_izquierdo,
        dip_derecho: tra.dip_derecho,
        producto: tra.producto ? tra.producto.nombre : null, // Solo el nombre del producto
        color: tra.color ? tra.color.nombre : null,       // Solo el nombre del color
        tratamiento: tra.tratamiento ? tra.tratamiento.nombre : null, // Solo el nombre del tratamiento
      }));
  
      return {
        data
      };
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

async update(id: string, updateTrabajoDto: UpdateTrabajoDto): Promise<Trabajo> {
  try {
    const { id_personal, detalleTrabajo, ...trabajoData } = updateTrabajoDto;

    // Verificar si el trabajo existe
    const trabajo = await this.findOne(id);
    if (!trabajo) {
      throw new NotFoundException(`Trabajo con ID "${id}" no encontrado`);
    }

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

    let oldProducto: Producto;
    let newProducto: Producto;

    // Verificar si se actualizó el id_producto
    if (detalleTrabajo?.id_producto) {
      // Obtener el producto antiguo y el nuevo producto
      oldProducto = trabajo.detalleTrabajo.producto;
      newProducto = await this.productoRepository.findOne({
        where: { id_producto: detalleTrabajo.id_producto },
      });

      if (!newProducto) {
        throw new NotFoundException(`Producto con ID "${detalleTrabajo.id_producto}" no encontrado`);
      }

      // Verificar que ambos productos tienen suficiente stock
      if (oldProducto.stock < 2) {
        throw new Error(`No hay suficiente stock en el producto antiguo para revertir la cantidad.`);
      }
      if (newProducto.stock < 2) {
        throw new Error(`No hay suficiente stock en el nuevo producto para asignar el trabajo.`);
      }

      // Si hay un cambio en el producto, realizar la actualización del stock
      if (oldProducto.id_producto !== newProducto.id_producto) {
        // Sumar 2 al stock del producto antiguo
        oldProducto.stock += 2;
        await this.productoRepository.save(oldProducto);

        // Restar 2 al stock del nuevo producto
        newProducto.stock -= 2;
        await this.productoRepository.save(newProducto);
      }
    }

    // Actualizar el detalle del trabajo si se proporciona
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
      detalleTrabajo: trabajo.detalleTrabajo,
    });

    return updatedTrabajo;
  } catch (error) {
    this.errorHandleService.errorHandle(error);
    throw new Error('No se pudo actualizar el trabajo correctamente.');
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
