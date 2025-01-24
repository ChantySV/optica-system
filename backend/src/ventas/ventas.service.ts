import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from './entities/venta.entity';
import { DetalleVenta } from './entities/detalle-venta.entity';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';
import { Personal } from 'src/personal/entities/personal.entity';
import { Trabajo } from 'src/mtrabajos/trabajos/entities/trabajo.entity';
import { Usuario } from 'src/auth/usuarios/entities/usuario.entity';

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

    private readonly errorHandleService: ErrorHandleService,
  ) {}

  async create(createVentaDto: CreateVentaDto, user: Usuario): Promise<Venta> {
    try {
      const { id_persona, detalleVentas } = createVentaDto;
  
      // Validar que el personal exista
      const personal = await this.personalRepository.findOne({ where: { id_personal: id_persona } });
      if (!personal) {
        throw new NotFoundException(`El personal con ID "${id_persona}" no fue encontrado.`);
      }
  
      // Validar que haya al menos un detalle de venta
      if (!detalleVentas || detalleVentas.length === 0) {
        throw new BadRequestException('Debe incluir al menos un detalle de venta.');
      }
  
      let monto_total = 0;
      const trabajos = [];
  
      // Validar y calcular el monto total
      for (const detalle of detalleVentas) {
        const trabajo = await this.trabajoRepository.findOne({
          where: { id_trabajo: detalle.id_trabajo },
        });
  
        if (!trabajo) {
          throw new NotFoundException(`El trabajo con ID "${detalle.id_trabajo}" no fue encontrado.`);
        }
  
        if (trabajo.detalleVenta) {
          throw new BadRequestException(`El trabajo con ID "${trabajo.id_trabajo}" ya está asociado a una venta.`);
        }
  
        trabajos.push(trabajo);
      
      }
  
      // Crear la venta asociando el usuario autenticado
      const venta = this.ventaRepository.create({
        personal,
        usuario: user,
        monto_total: parseFloat(monto_total.toFixed(2)), // Monto total calculado
      });
  
      const savedVenta = await this.ventaRepository.save(venta);
  
      // Crear los detalles de venta
      for (const trabajo of trabajos) {
        const nuevoDetalle = this.detalleVentaRepository.create({
          trabajo,
          venta: savedVenta,
        });
  
        await this.detalleVentaRepository.save(nuevoDetalle);
      }
  
      return savedVenta;
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }
  
  // Obtener todas las ventas activas
  async findAll(): Promise<Venta[]> {
    try {
      return await this.ventaRepository.find({
        where: { activo: true },
        relations: ['personal', 'detalleVentas' ],
      });
    } catch (error) {
      this.errorHandleService.errorHandle(error);
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

  // Actualizar una venta con sus detalles
  async update(id: string, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    try {
      const { id_persona, detalleVentas, ...ventaData } = updateVentaDto;

      // Verificar si la venta existe
      const venta = await this.ventaRepository.findOne({ where: { id_venta: id } });
      if (!venta) {
        throw new NotFoundException(`Venta con ID "${id}" no encontrada`);
      }

      // Verificar si el personal existe
      if (id_persona) {
        const personal = await this.personalRepository.findOne({ where: { id_personal: id_persona } });
        if (!personal) {
          throw new NotFoundException(`Personal con ID "${id_persona}" no encontrado`);
        }
        venta.personal = personal;
      }

      // Actualizar la venta
      Object.assign(venta, ventaData);
      const updatedVenta = await this.ventaRepository.save(venta);

      // Actualizar detalles (borrar y volver a insertar para simplificar)
      if (detalleVentas && detalleVentas.length > 0) {
        await this.detalleVentaRepository.delete({ venta: { id_venta: id } });

        const nuevosDetalles = detalleVentas.map((detalle) =>
          this.detalleVentaRepository.create({
            ...detalle,
            venta: updatedVenta,
          }),
        );
        await this.detalleVentaRepository.save(nuevosDetalles);
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
