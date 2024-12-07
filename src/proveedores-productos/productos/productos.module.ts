import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto } from './entities/producto.entity';
import { ProductoProveedor } from './entities/produto-proveedor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Producto, ProductoProveedor ]), // Registra la entidad Producto
  ],
  controllers: [ ProductosController ],
  providers: [ ProductosService ],
  exports: [ ProductosService ], // Exporta el servicio si es necesario
})
export class ProductosModule {}
