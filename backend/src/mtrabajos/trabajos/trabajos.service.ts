import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
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
import { PmpService } from 'src/proveedores-productos/pmp/pmp.service';
import { ConceptoEnum } from 'src/proveedores-productos/pmp/entities/pmp.entity';
import { FindAllTrabajoDto } from './dto/find-all-trabajo.dto';

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

    private readonly pmpService: PmpService,
    

    private readonly errorHandleService: ErrorHandleService,
  ) {}

  // Crear un nuevo trabajo
  async create(createTrabajoDto: CreateTrabajoDto) {
    try {
      const { id_personal, detalleTrabajo, ...trabajoData } = createTrabajoDto;
  
      const personal = await this.personalRepository.findOne({
        where: { id_personal, activo: true },
      });
      if (!personal) {
        throw new NotFoundException(`Personal con ID "${id_personal}" no encontrado`);
      }
  
      const producto = await this.productoRepository.findOne({
        where: { id_producto: detalleTrabajo.id_producto },
      });
      if (!producto) {
        throw new NotFoundException(`Producto con ID "${detalleTrabajo.id_producto}" no encontrado`);
      }
  
      let color = null;
      if (detalleTrabajo.id_color) {
        color = await this.colorRepository.findOne({
          where: { id_color: detalleTrabajo.id_color },
        });
        if (!color) {
          throw new NotFoundException(`Color con ID "${detalleTrabajo.id_color}" no encontrado`);
        }
      }
  
      let tratamiento = null;
      if (detalleTrabajo.id_tratamiento) {
        tratamiento = await this.tratamientoRepository.findOne({
          where: { id_tratamiento: detalleTrabajo.id_tratamiento },
        });
        if (!tratamiento) {
          throw new NotFoundException(`Tratamiento con ID "${detalleTrabajo.id_tratamiento}" no encontrado`);
        }
      }
  
      const detalle = this.detalleTrabajoRepository.create({
        ...detalleTrabajo,
        producto,
        color,  
        tratamiento, 
      });
      const savedDetalle = await this.detalleTrabajoRepository.save(detalle);
  
      const trabajo = this.trabajoRepository.create({
        ...trabajoData,
        detalleTrabajo: savedDetalle,
        personal,
      });
      const savedTrabajo = await this.trabajoRepository.save(trabajo);
  
      if (producto.stock >= 2) {
        producto.stock -= 2;  
        await this.productoRepository.save(producto); 
      } else {
        throw new Error(`No hay suficiente stock para realizar el trabajo.`);
      }
          await this.pmpService.createPmp(producto.id_producto,  2, ConceptoEnum.VENTA);
      return savedTrabajo;
    } catch (error) {
      console.log(error);
      this.errorHandleService.errorHandle(error);
      throw new Error('No se pudo crear el trabajo correctamente.');
    }
  }  
  
  
  async findAll(dto: FindAllTrabajoDto) {
    const { page, limit, search, sortField, sortOrder } = dto;
  
    const query: SelectQueryBuilder<Trabajo> = this.trabajoRepository.createQueryBuilder('trabajo')
      .leftJoinAndSelect('trabajo.personal', 'personal')
      .leftJoinAndSelect('trabajo.detalleTrabajo', 'detalleTrabajo')
      .leftJoinAndSelect('detalleTrabajo.producto', 'producto')
      .leftJoinAndSelect('detalleTrabajo.color', 'color')
      .leftJoinAndSelect('detalleTrabajo.tratamiento', 'tratamiento')
      .leftJoinAndSelect('trabajo.detalleVenta', 'detalleVenta');
  
    if (search) {
      query.where('trabajo.numero_trabajo = :numero', { numero: Number(search) });
    }
    
    query.orderBy(`trabajo.${sortField}`, sortOrder as 'ASC' | 'DESC')
      .skip((page - 1) * limit)
      .take(limit);
  
    const [data, total] = await query.getManyAndCount();
  
    return {
      ok: true,
      data,
      total,
      page,
      limit,
    };
  }
  
  
  async findPendientes(){
    try {
      const [trabajos, total] = await this.trabajoRepository.findAndCount({
        where: { estado: 'pendiente', activo: true },    
        relations: ['detalleTrabajo', 'personal'],
      });      
      const data = trabajos.map((trabajo) => ({
        id_trabajo: trabajo.id_trabajo,
        numero_trabajo: trabajo.numero_trabajo,
        fecha_entrada: trabajo.fecha_entrada,
        fecha_salida: trabajo.fecha_salida,
        estado: trabajo.estado,
        personal: `${trabajo.personal.nombres} ${trabajo.personal.apellido_paterno}`,
        detalleTrabajo: trabajo.detalleTrabajo,
      }));

      return { data, total };
    } catch (error) {
      throw new NotFoundException('Error al obtener los trabajos pendientes.');
    }
  }

  async findDetalleTrabajo(id: string) {    
    try {      
      const detalle = await this.detalleTrabajoRepository.find({
        where: { id_detalleTrabajo: id },
        relations: ['producto', 'color', 'tratamiento'],
      });
  
      const data = detalle.map(tra => ({
        id_detalleTrabajo: tra.id_detalleTrabajo,
        distancia: tra.distancia,
        esferico_derecho: tra.esferico_derecho,
        esferico_izquierdo: tra.esferico_izquierdo,
        cilindro_derecho: tra.cilindro_derecho,
        cilindro_izquierdo: tra.cilindro_izquierdo,
        eje_derecho: tra.eje_derecho,
        eje_izquierdo: tra.eje_izquierdo,
        producto: tra.producto ? tra.producto.nombre : null,
        color: tra.color.nombre || null,      
        tratamiento:  tra.tratamiento.nombre || null, 
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
