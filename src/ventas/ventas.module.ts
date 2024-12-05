import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { Venta } from './entities/venta.entity';
import { DetalleVenta } from './entities/detalle-venta.entity';
import { AuthModule } from 'src/auth/auth.module';
import { OpticasModule } from 'src/opticas/opticas.module';
import { TrabajosModule } from 'src/trabajos/trabajos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Venta, DetalleVenta]),
    OpticasModule,
    AuthModule,
    TrabajosModule,
  ],
  controllers: [VentasController],
  providers: [VentasService],
})
export class VentasModule {}
