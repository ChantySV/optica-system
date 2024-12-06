import { Module } from '@nestjs/common';
import { VentasModule } from './ventas/ventas.module';
import { DetalleVentasModule } from './detalle-ventas/detalle-ventas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './ventas/entities/venta.entity';
import { DetalleVenta } from './detalle-ventas/entities/detalle-venta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Venta, DetalleVenta
    ]),
    VentasModule, 
    DetalleVentasModule]
})
export class MventasModule {}
