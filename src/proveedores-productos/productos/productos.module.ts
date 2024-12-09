import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto } from './entities/producto.entity';
import { ProductoProveedor } from './entities/produto-proveedor.entity';
import { ProveedoresModule } from '../proveedores/proveedores.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Producto, ProductoProveedor ]), 
    ProveedoresModule
  ],
  controllers: [ ProductosController ],
  providers: [ ProductosService ],
  exports: [ 
    ProductosService, 
    TypeOrmModule 
  ], 
})
export class ProductosModule {}
