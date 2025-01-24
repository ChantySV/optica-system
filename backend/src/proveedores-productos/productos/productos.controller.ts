import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Auth } from 'src/auth/usuarios/decorators/get-usuario.decorator';
import { ValidRoles } from 'src/auth/usuarios/interfaces/valid-roles.interface';
import { PaginationDto } from 'src/common/pagination-dto';
import { QueryGetDto } from 'src/common/QueryGet-dto';
import { QueryProductoDto } from './dto/query-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) { }

  @Post()
  @Auth(ValidRoles.encargadoProductos)
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @Get('admin-view')
  @Auth(ValidRoles.encargadoProductos)
  findAllAdmin(
    @Query() paginationDto: PaginationDto,
    @Query() queryGetDto: QueryGetDto,
    @Query() queryProducto: QueryProductoDto
  ) {
    return this.productosService.findAllAdmin(paginationDto, queryGetDto, queryProducto);
  }

  @Get()
  @Auth(ValidRoles.encargadoProductos)
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query() queryGetDto: QueryGetDto,
    @Query() queryProducto: QueryProductoDto
  ) {
    return this.productosService.findAll(paginationDto, queryGetDto, queryProducto);
  }

  @Get('nombres')
  @Auth(ValidRoles.encargadoTrabajos)
  findProducto() {
    return this.productosService.findProdutos();
  }

  @Get('search')
  @Auth(ValidRoles.encargadoProductos)
  searchProducto(
    @Query('search') search: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.productosService.searchProducto(search, paginationDto,);
  }

  @Get(':id')
  @Auth(ValidRoles.encargadoProductos)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.encargadoProductos)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(id, updateProductoDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.encargadoProductos)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosService.remove(id);
  }
}
