import { Injectable } from '@nestjs/common';
import { CreateDetalleVentaDto } from './dto/create-detalle-venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle-venta.dto';

@Injectable()
export class DetalleVentasService {
  create(createDetalleVentaDto: CreateDetalleVentaDto) {
    return 'This action adds a new detalleVenta';
  }

  findAll() {
    return `This action returns all detalleVentas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleVenta`;
  }

  update(id: number, updateDetalleVentaDto: UpdateDetalleVentaDto) {
    return `This action updates a #${id} detalleVenta`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleVenta`;
  }
}
