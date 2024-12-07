import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ColoresService } from './colores.service';
import { CreateColoreDto } from './dto/create-colore.dto';
import { UpdateColoreDto } from './dto/update-colore.dto';

@Controller('colores')
export class ColoresController {
  constructor(private readonly coloresService: ColoresService) {}

  @Post()
  create(@Body() createColoreDto: CreateColoreDto) {
    return this.coloresService.create(createColoreDto);
  }

  @Get()
  findAll() {
    return this.coloresService.findAll();
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateColoreDto: UpdateColoreDto) {
    return this.coloresService.update(id, updateColoreDto);
  }

  @Patch(':id/disable')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.coloresService.remove(id);
  }
}
