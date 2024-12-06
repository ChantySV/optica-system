import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleTrabajosService } from './detalle-trabajos.service';
import { CreateDetalleTrabajoDto } from './dto/create-detalle-trabajo.dto';
import { UpdateDetalleTrabajoDto } from './dto/update-detalle-trabajo.dto';

@Controller('detalle-trabajos')
export class DetalleTrabajosController {
  constructor(private readonly detalleTrabajosService: DetalleTrabajosService) {}

  @Post()
  create(@Body() createDetalleTrabajoDto: CreateDetalleTrabajoDto) {
    return this.detalleTrabajosService.create(createDetalleTrabajoDto);
  }

  @Get()
  findAll() {
    return this.detalleTrabajosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleTrabajosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleTrabajoDto: UpdateDetalleTrabajoDto) {
    return this.detalleTrabajosService.update(+id, updateDetalleTrabajoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleTrabajosService.remove(+id);
  }
}
