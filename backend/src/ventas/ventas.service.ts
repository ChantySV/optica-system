import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository, SelectQueryBuilder } from 'typeorm';
import { Venta } from './entities/venta.entity';
import { DetalleVenta } from './entities/detalle-venta.entity';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';
import { Personal } from 'src/personal/entities/personal.entity';
import { Trabajo } from 'src/mtrabajos/trabajos/entities/trabajo.entity';
import { Usuario } from 'src/auth/usuarios/entities/usuario.entity';
import { PaginationDto } from 'src/common/pagination-dto';
import { QueryGetDto } from 'src/common/QueryGet-dto';
import { QueryVentaDto } from './dto/query-venta.dto';
import { PmpService } from 'src/proveedores-productos/pmp/pmp.service';
import { ConceptoEnum } from 'src/proveedores-productos/pmp/entities/pmp.entity';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,

    @InjectRepository(DetalleVenta)
    private readonly detalleVentaRepository: Repository<DetalleVenta>,

    @InjectRepository(Personal)
    private readonly personalRepository: Repository<Personal>,

    @InjectRepository(Trabajo)
    private readonly trabajoRepository: Repository<Trabajo>,

    private readonly pmpService: PmpService,
    
    private readonly errorHandleService: ErrorHandleService,
  ) { }

async create(createVentaDto: CreateVentaDto, user: Usuario) {
  try {
    const { monto_total, id_persona, detalleVentas } = createVentaDto;

    const personal = await this.personalRepository.findOne({ where: { id_personal: id_persona } });
    if (!personal) {
      throw new NotFoundException(`El personal con ID "${id_persona}" no fue encontrado.`);
    }

    if (!detalleVentas || detalleVentas.length === 0) {
      throw new BadRequestException('Debe incluir al menos un detalle de venta.');
    }

    const trabajos = [];

    for (const detalle of detalleVentas) {
      // Traemos trabajo con detalleTrabajo y producto para crear PMP después
      const trabajo = await this.trabajoRepository.findOne({
        where: { id_trabajo: detalle.id_trabajo },
        relations: ['detalleTrabajo', 'detalleTrabajo.producto'],
      });

      if (!trabajo) {
        throw new NotFoundException(`El trabajo con ID "${detalle.id_trabajo}" no fue encontrado.`);
      }

      if (trabajo.detalleVenta) {
        throw new BadRequestException(`El trabajo con ID "${trabajo.id_trabajo}" ya está asociado a una venta.`);
      }

      trabajos.push(trabajo);

      trabajo.estado = 'entregado';

      await this.trabajoRepository.save(trabajo);
    }

    const venta = this.ventaRepository.create({
      personal,
      usuario: user,
      monto_total: parseFloat(monto_total.toFixed(2)),
    });

    const savedVenta = await this.ventaRepository.save(venta);

    for (const trabajo of trabajos) {
      const nuevoDetalle = this.detalleVentaRepository.create({
        trabajo,
        venta: savedVenta,
      });

      await this.detalleVentaRepository.save(nuevoDetalle);

      // Crear registro PMP con concepto VENTA
      const producto = trabajo.detalleTrabajo.producto;
      const cantidad = 1;

      await this.pmpService.createPmp(producto.id_producto, cantidad, ConceptoEnum.VENTA);
    }

    return savedVenta;
  } catch (error) {
    this.errorHandleService.errorHandle(error);
    throw new BadRequestException('Hubo un error al crear la venta.');
  }
}

  async findAll(paginationDto: PaginationDto, queryGetDto: QueryGetDto, queryVentaDto: QueryVentaDto) {
    const { limit, offset } = paginationDto
    const { order = 'ASC' } = queryGetDto;
    const { sortBy = 'monto_total' } = queryVentaDto

    try {
      const [ventas, total] = await this.ventaRepository.findAndCount({
        where: { activo: true },
        relations: ['usuario', 'detalleVentas', 'detalleVentas.trabajo', 'personal'],
        take: limit,
        skip: offset,
        order: { [sortBy]: order }
      });

      const data = ventas.map((venta) => ({
        id_venta: venta.id_venta,
        monto_total: venta.monto_total,
        fecha_venta: venta.fecha_venta,
        usuario: venta.usuario.nombre_usuario,
        personal: venta.personal.nombres,
        detalleVentas: venta.detalleVentas.map((detalle) => ({
          id_detalle: detalle.id_detalleVenta,
          numero_trabajo: detalle.trabajo.numero_trabajo,
          id_trabajo: detalle.trabajo.id_trabajo
        })),
      }));

      return { data, total }
    } catch (error) {
      this.errorHandleService.errorHandle(error);
      throw error
    }
  }

//Barra de busqueda
  async searchVenta(search: string, paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    try {
      // Crear un QueryBuilder para la entidad Venta
      const queryBuilder = this.ventaRepository.createQueryBuilder('venta')
        .leftJoinAndSelect('venta.personal', 'personal') 
        .where('venta.activo = :activo', { activo: true })
        .andWhere(
          `(personal.nombres LIKE :search)`,
          { search: `%${search}%` },
        )
        .take(limit)
        .skip(offset)
        .orderBy('venta.fecha_venta', 'DESC');      
      const [ventas, total] = await queryBuilder.getManyAndCount();

      return { ventas, total };
    } catch (error) {
      this.errorHandleService.errorHandle(error);
      throw new BadRequestException('Error al buscar ventas');
    }
  }

  //Get Precio Venta Producto
  async findPrecioVenta(id_trabajo: string): Promise<any> {
    try {    
      const trabajo = await this.trabajoRepository.findOne({
        where: { id_trabajo },
        relations: ['detalleTrabajo', 'detalleTrabajo.producto'],
      });

      if (!trabajo) {
        throw new NotFoundException(`Trabajo con ID "${id_trabajo}" no encontrado`);
      }

      return trabajo.detalleTrabajo.producto.precio_venta * 2;
    } catch (error) {
      this.errorHandleService.errorHandle(error);
      throw new Error('Error al obtener el trabajo con los precios de venta.');
    }
  }

  //Get Detalle Venta
  async findDetalleVenta(id_venta: string): Promise<any> {
    try {
      const venta = await this.ventaRepository.findOne({
        where: { id_venta },
        relations: ['detalleVentas', 'detalleVentas.trabajo', 'detalleVentas.trabajo.detalleTrabajo', 'detalleVentas.trabajo.detalleTrabajo.producto'],
      });

      if (!venta) {
        throw new NotFoundException(`Venta con ID "${id_venta}" no encontrada`);
      }

      // Mapeamos los detalles de la venta para incluir los datos de los trabajos y productos asociados
      const data = {
        id_venta: venta.id_venta,
        monto_total: venta.monto_total,
        fecha_venta: venta.fecha_venta,
        // usuario: venta.usuario.nombre_usuario,
        detalleVentas: venta.detalleVentas.map((detalle) => ({
          numero_trabajo: detalle.trabajo.numero_trabajo,
          estado: detalle.trabajo?.estado,
          producto: {
            id_producto: detalle.trabajo?.detalleTrabajo?.producto?.id_producto,
            nombre_producto: detalle.trabajo?.detalleTrabajo?.producto?.nombre,
            precio_venta: detalle.trabajo?.detalleTrabajo?.producto?.precio_venta,
          },
        })),
      };

      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener el detalle de la venta.');
    }
  }

  // Obtener una venta por ID
  async findOne(id: string): Promise<Venta> {
    try {
      const venta = await this.ventaRepository.findOne({
        where: { id_venta: id, activo: true },
        relations: ['personal', 'detalleVentas', 'detalleVentas.trabajo'],
      });

      if (!venta) {
        throw new NotFoundException(`Venta con ID "${id}" no encontrada`);
      }

      return venta;
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async update(id: string, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    try {
      const { id_persona, detalleVentas, ...ventaData } = updateVentaDto;
  
      // Verificar si la venta existe
      const venta = await this.ventaRepository.findOne({ where: { id_venta: id } });
      if (!venta) {
        throw new NotFoundException(`Venta con ID "${id}" no encontrada`);
      }
  
      // 1. Obtener los detalles actuales de la venta (cargando la relación 'trabajo')
      const detallesPrevios = await this.detalleVentaRepository.find({
        where: { venta: { id_venta: id } },
        relations: ['trabajo'],
      });
      const trabajosPrevios = detallesPrevios.map(detalle => detalle.trabajo.id_trabajo);
  
      const trabajosNuevos = detalleVentas && detalleVentas.length > 0
        ? detalleVentas.map(detalle => detalle.id_trabajo)
        : [];
  
      const trabajosRemovidos = trabajosPrevios.filter(
        idTrabajo => !trabajosNuevos.includes(idTrabajo),
      );
  
      if (trabajosRemovidos.length > 0) {
        await this.trabajoRepository.update(
          { id_trabajo: In(trabajosRemovidos) },
          { estado: 'pendiente' },
        );
      }
  
      if (id_persona) {
        const personal = await this.personalRepository.findOne({
          where: { id_personal: id_persona },
        });
        if (!personal) {
          throw new NotFoundException(`Personal con ID "${id_persona}" no encontrado`);
        }
        venta.personal = personal;
      }
  
      Object.assign(venta, ventaData);
      const updatedVenta = await this.ventaRepository.save(venta);
  
      if (detalleVentas) {
        await this.detalleVentaRepository.delete({ venta: { id_venta: id } });
  
        if (detalleVentas.length > 0) {
          const nuevosDetalles = await Promise.all(
            detalleVentas.map(async detalle => {
              const trabajoEntity = await this.trabajoRepository.findOne({
                where: { id_trabajo: detalle.id_trabajo },
              });
              if (!trabajoEntity) {
                throw new NotFoundException(`Trabajo con ID "${detalle.id_trabajo}" no encontrado`);
              }
              return this.detalleVentaRepository.create({
                trabajo: trabajoEntity, 
                venta: updatedVenta,
              });
            }),
          );
          await this.detalleVentaRepository.save(nuevosDetalles);
        }
      }
  
      return updatedVenta;
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Desactivar (eliminar lógicamente) una venta
  async remove(id: string): Promise<Venta> {
    try {
      const venta = await this.findOne(id);
      venta.activo = false;
      return await this.ventaRepository.save(venta);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }
}
