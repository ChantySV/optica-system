import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrabajosService } from './trabajos.service';
import { CreateTrabajoDto } from './dto/create-trabajo.dto';
import { UpdateTrabajoDto } from './dto/update-trabajo.dto';
import { Auth } from 'src/auth/usuarios/decorators/get-usuario.decorator';
import { ValidRoles } from 'src/auth/usuarios/interfaces/valid-roles.interface';

@Controller('trabajos')
export class TrabajosController {
  constructor(private readonly trabajosService: TrabajosService) {}

  @Post()
  @Auth(ValidRoles.encargadoTrabajos)
  create(@Body() createTrabajoDto: CreateTrabajoDto) {
    return this.trabajosService.create(createTrabajoDto);
  }

  @Get()
  @Auth(ValidRoles.encargadoTrabajos)
  findAll() {
    return this.trabajosService.findAll();
  }

  @Get(':id')
  @Auth(ValidRoles.encargadoTrabajos)
  findOne(@Param('id') id: string) {
    return this.trabajosService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.encargadoTrabajos)
  update(@Param('id') id: string, @Body() updateTrabajoDto: UpdateTrabajoDto) {
    return this.trabajosService.update(id, updateTrabajoDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.encargadoTrabajos)
  remove(@Param('id') id: string) {
    return this.trabajosService.remove(id);
  }
}
