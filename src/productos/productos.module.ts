import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { ProveedoresModule } from 'src/proveedores/proveedores.module';

@Module({
  imports:[
    TypeOrmModule.forFeature(
      [ Producto, ProveedoresModule ]
    )
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
  exports: [ TypeOrmModule, ProductosService ]
})
export class ProductosModule {}
