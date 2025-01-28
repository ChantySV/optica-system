import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { TratamientosService } from './tratamientos.service';
import { CreateTratamientoDto } from './dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';
import { Auth } from 'src/auth/usuarios/decorators/get-usuario.decorator';
import { ValidRoles } from 'src/auth/usuarios/interfaces/valid-roles.interface';

@Controller('tratamientos')
export class TratamientosController {
  constructor(private readonly tratamientosService: TratamientosService) {}

  @Post()
  @Auth(ValidRoles.encargadoTrabajos)
  create(@Body() createTratamientoDto: CreateTratamientoDto) {
    return this.tratamientosService.create(createTratamientoDto);
  }

  @Get()
  @Auth(ValidRoles.encargadoTrabajos)
  findAll(
  @Query() query,    
  ) {
    return this.tratamientosService.findAll(query);
  }

  @Get('nombres')
  @Auth(ValidRoles.encargadoTrabajos)
  findTratamiento() {
    return this.tratamientosService.findTratamiento();
  }

  @Get(':id')
  @Auth(ValidRoles.encargadoTrabajos)
  findOne(@Param('id') id: string) {
    return this.tratamientosService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.encargadoTrabajos)
  update(@Param('id') id: string, @Body() updateTratamientoDto: UpdateTratamientoDto) {
    return this.tratamientosService.update(id, updateTratamientoDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.encargadoTrabajos)
  remove(@Param('id') id: string) {
    return this.tratamientosService.remove(id);
  }
}
