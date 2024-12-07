import { Module } from '@nestjs/common';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [
    ProveedoresModule,
    ProductosModule,
  ],
  exports: [
    ProveedoresModule,
    ProductosModule,
  ]
})
export class ProveedoresProductosModule { }
