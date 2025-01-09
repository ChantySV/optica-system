import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ColoresService } from './colores.service';
import { CreateColoreDto } from './dto/create-colore.dto';
import { UpdateColoreDto } from './dto/update-colore.dto';
import { Auth } from 'src/auth/usuarios/decorators/get-usuario.decorator';
import { ValidRoles } from 'src/auth/usuarios/interfaces/valid-roles.interface';

@Controller('colores')
export class ColoresController {
  constructor(private readonly coloresService: ColoresService) {}

  @Post()
  @Auth(ValidRoles.encargadoTrabajos)
  create(@Body() createColoreDto: CreateColoreDto) {
    return this.coloresService.create(createColoreDto);
  }

  @Get()
  @Auth(ValidRoles.encargadoTrabajos)
  findAll() {
    return this.coloresService.findAll();
  }

  @Patch(':id')
  @Auth(ValidRoles.encargadoTrabajos)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateColoreDto: UpdateColoreDto) {
    return this.coloresService.update(id, updateColoreDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.encargadoTrabajos)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.coloresService.remove(id);
  }
}
