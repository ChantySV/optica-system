import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Auth } from 'src/auth/usuarios/decorators/get-usuario.decorator';
import { ValidRoles } from 'src/auth/usuarios/interfaces/valid-roles.interface';
import { IsUUID } from 'class-validator';
import { PaginationDto } from 'src/common/pagination-dto';
import { QueryGetDto } from 'src/common/QueryGet-dto';
import { QueryVentaDto } from './dto/query-venta.dto';

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
  findAll(
        @Query() paginationDto: PaginationDto,        
        @Query() queryGetDto: QueryGetDto,
        @Query() queryVentaDto :QueryVentaDto
  ) {
    return this.ventasService.findAll( paginationDto, queryGetDto, queryVentaDto);
  }

  @Get('search')
  @Auth(ValidRoles.encargadoVentas)
  searchVenta(
    @Query('search') search: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.ventasService.searchVenta(search, paginationDto,);
  }

  @Get('/detalle/:id_venta')
  async getDetalleVenta(@Param('id_venta') id_venta: string) {
    return this.ventasService.findDetalleVenta(id_venta);
  }

  @Get('precio-venta/:id')
  @Auth(ValidRoles.encargadoVentas)
  findPrecioVenta(@Param('id') id: string) {
    return this.ventasService.findPrecioVenta(id);
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
