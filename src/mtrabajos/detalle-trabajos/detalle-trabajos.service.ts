import { Injectable } from '@nestjs/common';
import { CreateDetalleTrabajoDto } from './dto/create-detalle-trabajo.dto';
import { UpdateDetalleTrabajoDto } from './dto/update-detalle-trabajo.dto';

@Injectable()
export class DetalleTrabajosService {
  create(createDetalleTrabajoDto: CreateDetalleTrabajoDto) {
    return 'This action adds a new detalleTrabajo';
  }

  findAll() {
    return `This action returns all detalleTrabajos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleTrabajo`;
  }

  update(id: number, updateDetalleTrabajoDto: UpdateDetalleTrabajoDto) {
    return `This action updates a #${id} detalleTrabajo`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleTrabajo`;
  }
}
