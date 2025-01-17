import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto } from './entities/producto.entity';
import { ProductoProveedor } from './entities/produto-proveedor.entity';
import { ProveedoresModule } from '../proveedores/proveedores.module';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Producto, ProductoProveedor ]), 
    ProveedoresModule, 
    CommonModule,
    AuthModule,
  ],
  controllers: [ ProductosController ],
  providers: [ ProductosService ],
  exports: [ 
    ProductosService, 
    TypeOrmModule 
  ], 
})
export class ProductosModule {}
