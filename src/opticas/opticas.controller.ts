import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OpticasService } from './opticas.service';
import { CreateOpticaDto } from './dto/create-optica.dto';
import { UpdateOpticaDto } from './dto/update-optica.dto';

@Controller('opticas')
export class OpticasController {
  constructor(private readonly opticasService: OpticasService) {}

  @Post()
  create(@Body() createOpticaDto: CreateOpticaDto) {
    return this.opticasService.create(createOpticaDto);
  }

  @Get()
  findAll() {
    return this.opticasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opticasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpticaDto: UpdateOpticaDto) {
    return this.opticasService.update(id, updateOpticaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opticasService.remove(id);
  }
}
