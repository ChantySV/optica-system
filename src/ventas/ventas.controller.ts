import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Auth } from 'src/auth/usuarios/decorators/get-usuario.decorator';
import { ValidRoles } from 'src/auth/usuarios/interfaces/valid-roles.interface';

@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  @Auth(ValidRoles.encargadoVentas)
  create(
    @Body() createVentaDto: CreateVentaDto,
    @Req() req: any,
  ) {
    return this.ventasService.create(createVentaDto, req.user);
  }

  @Get()
  @Auth(ValidRoles.encargadoVentas)
  findAll() {
    return this.ventasService.findAll();
  }

  @Get(':id')
  @Auth(ValidRoles.encargadoVentas)
  findOne(@Param('id') id: string) {
    return this.ventasService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.encargadoVentas)
  update(@Param('id') id: string, @Body() updateVentaDto: UpdateVentaDto) {
    return this.ventasService.update(id, updateVentaDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.encargadoVentas)
  remove(@Param('id') id: string) {
    return this.ventasService.remove(id);
  }
}
