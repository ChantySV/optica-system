import { Module } from '@nestjs/common';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ProductosModule } from './productos/productos.module';
import { PmpModule } from './pmp/pmp.module';

@Module({
  imports: [
    ProveedoresModule,
    ProductosModule,
    PmpModule,
  ],
  exports: [
    ProveedoresModule,
    ProductosModule,
  ]
})
export class ProveedoresProductosModule { }
