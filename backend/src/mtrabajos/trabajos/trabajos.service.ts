import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, SelectQueryBuilder } from 'typeorm';
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
  ) { }

  async create(createTrabajoDto: CreateTrabajoDto) {
    try {
      const { id_personal, numero_trabajo, detalleTrabajo, ...trabajoData } = createTrabajoDto;
  
      const existingTrabajo = await this.trabajoRepository.findOne({
        where: { numero_trabajo: numero_trabajo, activo: true },
      });
  
      if (existingTrabajo) {
        throw new BadRequestException({
          code: 'TRABAJO_DUPLICADO',
          message: `El número de trabajo "${numero_trabajo}" ya está en uso.`
        });
      }
  
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
        numero_trabajo, 
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
        await this.pmpService.createPmp(producto.id_producto, 2, ConceptoEnum.VENTA);
        return savedTrabajo;
    } catch (error) {
      // console.log(error);
      if (!(error instanceof BadRequestException || error instanceof NotFoundException)) {
        console.error(error);
        this.errorHandleService.errorHandle(error);
        throw new Error('No se pudo crear el trabajo correctamente.');
      }
      throw error;
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

      query.where('trabajo.estado = :estado AND trabajo.activo =:activo', { estado: 'pendiente', activo: true });

      if (search) {
        query.andWhere('trabajo.numero_trabajo = :numero', { numero: Number(search) });
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

  async findAllEntregados(dto: FindAllTrabajoDto) {
    const { page, limit, search, sortField, sortOrder } = dto;

    const query: SelectQueryBuilder<Trabajo> = this.trabajoRepository.createQueryBuilder('trabajo')
      .leftJoinAndSelect('trabajo.personal', 'personal')
      .leftJoinAndSelect('trabajo.detalleTrabajo', 'detalleTrabajo')
      .leftJoinAndSelect('detalleTrabajo.producto', 'producto')
      .leftJoinAndSelect('detalleTrabajo.color', 'color')
      .leftJoinAndSelect('detalleTrabajo.tratamiento', 'tratamiento')
      .leftJoinAndSelect('trabajo.detalleVenta', 'detalleVenta');

      query.where('trabajo.estado = :estado AND trabajo.activo = :activo', { estado: 'entregado', activo: true });

      if (search) {
        query.andWhere('trabajo.numero_trabajo = :numero', { numero: Number(search) });
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

  async findPendientes() {
    try {
      const [trabajos, total] = await this.trabajoRepository.findAndCount({
        where: { estado: 'pendiente', activo: true },
        relations: ['detalleTrabajo', 'personal'],
      });
      const data = trabajos.map((trabajo) => ({
        id_trabajo: trabajo.id_trabajo,
        numero_trabajo: trabajo.numero_trabajo,
        fecha_entrada: trabajo.fecha_entrada,        
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
        tratamiento: tra.tratamiento.nombre || null,
      }));

      return {
        data
      };
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async findOne(id: string): Promise<Trabajo> {
    try {
      const trabajo = await this.trabajoRepository.findOne({
        where: { id_trabajo: id, activo: true },
        relations: ['detalleTrabajo', 'personal', 'detalleTrabajo.producto' ],
      });

      if (!trabajo) {
        throw new NotFoundException(`Trabajo con ID "${id}" no encontrado`);
      }

      return trabajo;
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async update(id: string, updateTrabajoDto: UpdateTrabajoDto) {
    try {
      const { id_personal, detalleTrabajo, numero_trabajo, ...trabajoData } = updateTrabajoDto;
  
      const trabajo = await this.findOne(id);
      if (!trabajo) {
        throw new NotFoundException(`Trabajo con ID "${id}" no encontrado`);
      }
  
      if (numero_trabajo) {
        const existingTrabajo = await this.trabajoRepository.findOne({
          where: { numero_trabajo, activo: true, id_trabajo: Not(id) },
        });
  
        if (existingTrabajo) {
          throw new BadRequestException({
            code: 'NUMERO_TRABAJO_DUPLICADO',
            message: `El número de trabajo "${numero_trabajo}" ya está en uso.`,
          });
        }
      }
  
      let oldProducto = trabajo.detalleTrabajo?.producto;
      let newProducto: Producto | undefined;
  
      if (id_personal) {
        const personal = await this.personalRepository.findOne({
          where: { id_personal, activo: true },
        });
        if (!personal) {
          throw new NotFoundException(`Personal con ID "${id_personal}" no encontrado`);
        }
        trabajo.personal = personal;
      }
  
      // Validar y actualizar producto si se cambia
      if (detalleTrabajo?.id_producto) {
        newProducto = await this.productoRepository.findOne({
          where: { id_producto: detalleTrabajo.id_producto },
        });
  
        if (!newProducto) {
          throw new NotFoundException(`Producto con ID "${detalleTrabajo.id_producto}" no encontrado`);
        }
  
        if (oldProducto && oldProducto.id_producto !== newProducto.id_producto) {
          if (oldProducto.stock < 2) {
            throw new BadRequestException({
              code: 'STOCK_ANTIGUO_INSUFICIENTE',
              message: `No hay suficiente stock en el producto antiguo para revertir la cantidad.`,
            });
          }
          if (newProducto.stock < 2) {
            throw new BadRequestException({
              code: 'STOCK_NUEVO_INSUFICIENTE',
              message: `No hay suficiente stock en el nuevo producto para asignar el trabajo.`,
            });
          }
  
          oldProducto.stock += 2;
          await this.productoRepository.save(oldProducto);
  
          newProducto.stock -= 2;
          await this.productoRepository.save(newProducto);
        }
      }
  
      if (detalleTrabajo) {
        const detalle = await this.detalleTrabajoRepository.preload({
          id_detalleTrabajo: trabajo.detalleTrabajo.id_detalleTrabajo,
          ...detalleTrabajo,
        });
  
        if (!detalle) {
          throw new NotFoundException(
            `DetalleTrabajo con ID "${trabajo.detalleTrabajo.id_detalleTrabajo}" no encontrado`
          );
        }
        await this.detalleTrabajoRepository.save(detalle);
      }
  
      const updatedTrabajo = await this.trabajoRepository.save({
        ...trabajo,
        ...trabajoData,
        numero_trabajo,
        detalleTrabajo: trabajo.detalleTrabajo,
      });
  
      return updatedTrabajo;
    } catch (error) {
      if (!(error instanceof BadRequestException || error instanceof NotFoundException)) {
        console.error(error);
        this.errorHandleService.errorHandle(error);
        throw new Error('No se pudo actualizar el trabajo correctamente.');
      }
      throw error;
    }
  }
  

  async remove(id: string): Promise<Trabajo> {
    try {
      const trabajo = await this.findOne(id);
      
      if (!trabajo || !trabajo.detalleTrabajo || !trabajo.detalleTrabajo.producto) {
        throw new NotFoundException(`Trabajo o detalles no encontrados para ID "${id}"`);
      }
  
      const producto = trabajo.detalleTrabajo.producto;
  
      producto.stock += 2;
      await this.productoRepository.save(producto);
  
      trabajo.activo = false;
      return await this.trabajoRepository.save(trabajo);
    } catch (error) {
      console.error('Error al eliminar el trabajo:', error);
      this.errorHandleService.errorHandle(error);
      throw new Error('No se pudo eliminar el trabajo correctamente.');
    }
  }
}
