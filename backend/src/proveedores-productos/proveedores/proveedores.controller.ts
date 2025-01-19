import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { Auth } from 'src/auth/usuarios/decorators/get-usuario.decorator';
import { ValidRoles } from 'src/auth/usuarios/interfaces/valid-roles.interface';
import { PaginationDto } from 'src/common/pagination-dto';
import { QueryGetDto } from 'src/common/QueryGet-dto';

@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) { }

  @Post()
  @Auth(ValidRoles.encargadoProductos)
  create(@Body() createProveedoreDto: CreateProveedoreDto) {
    return this.proveedoresService.create(createProveedoreDto);
  }
  
  @Get()
  //@Auth(ValidRoles.encargadoProductos)
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query() queryGetDto: QueryGetDto,
  ) {
    return this.proveedoresService.findAll(paginationDto, queryGetDto);
  }
  
  @Get('search')
  //@Auth(ValidRoles.encargadoProductos)
  async searchProveedores(
    @Query('search') search: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return await this.proveedoresService.searchProveedores(search, paginationDto);
  }
  
  @Get(':id')
  @Auth(ValidRoles.encargadoProductos)
  findOne(@Param('id') id: string) {
    return this.proveedoresService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.encargadoProductos)
  update(@Param('id') id: string, @Body() updateProveedoreDto: UpdateProveedoreDto) {
    return this.proveedoresService.update(id, updateProveedoreDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.encargadoProductos)
  remove(@Param('id') id: string) {
    return this.proveedoresService.remove(id);
  }
}
