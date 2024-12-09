import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post(':proveedorId')
  create(
    @Body() createProductoDto: CreateProductoDto,
    @Param('proveedorId', ParseUUIDPipe) proveedorId: string,
  ) {
    return this.productosService.create(createProductoDto, proveedorId);
  }

  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosService.remove(id);
  }

  @Post(':productoId/proveedores/:proveedorId')
  addProveedor(
    @Param('productoId', ParseUUIDPipe) productoId: string,
    @Param('proveedorId', ParseUUIDPipe) proveedorId: string,
  ) {
    return this.productosService.addProveedor(productoId, proveedorId);
  }
}
