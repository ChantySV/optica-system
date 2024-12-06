import { Module } from '@nestjs/common';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ProductosModule } from './productos/productos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './productos/entities/producto.entity';
import { Proveedor } from './proveedores/entities/proveedore.entity';
import { ProductoProveedor } from './productos/entities/produto-proveedor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Producto, Proveedor, ProductoProveedor
    ]),
    ProveedoresModule, ProductosModule
  ],
  exports:[
    TypeOrmModule
]
})
export class ProveedoresProductosModule {}
