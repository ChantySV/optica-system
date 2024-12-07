import { Module } from '@nestjs/common';
import { DetalleVentasService } from './detalle-ventas.service';
import { DetalleVentasController } from './detalle-ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleVenta } from './entities/detalle-venta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ DetalleVenta ])
  ],
  controllers: [ DetalleVentasController ],
  providers: [ DetalleVentasService ],
  exports: [ DetalleVentasService ]
})
export class DetalleVentasModule {}
