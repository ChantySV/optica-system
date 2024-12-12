import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports:[ 
    TypeOrmModule.forFeature([ Venta ]),
    CommonModule,
  ],  
  controllers: [VentasController],
  providers: [VentasService],
  exports: [ VentasService ]
})
export class VentasModule {}
