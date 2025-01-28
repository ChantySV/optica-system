import { Module } from '@nestjs/common';
import { TrabajosService } from './trabajos.service';
import { TrabajosController } from './trabajos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trabajo } from './entities/trabajo.entity';
import { CommonModule } from 'src/common/common.module';
import { DetalleTrabajo } from './entities/detalle-trabajo.entity';
import { PersonalModule } from 'src/personal/personal.module';
import { VentasModule } from 'src/ventas/ventas.module';
import { AuthModule } from 'src/auth/auth.module';
import { Producto } from 'src/proveedores-productos/productos/entities/producto.entity';
import { ProductosModule } from 'src/proveedores-productos/productos/productos.module';
import { TratamientosModule } from '../tratamientos/tratamientos.module';
import { ColoresModule } from '../colores/colores.module';
import { PmpService } from 'src/proveedores-productos/pmp/pmp.service';
import { PmpModule } from 'src/proveedores-productos/pmp/pmp.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Trabajo, DetalleTrabajo ]), 
    PersonalModule,
    CommonModule,        
    TrabajosModule,
    ProductosModule,
    TratamientosModule,
    PmpModule,
    ColoresModule,
    AuthModule,
  ],
  controllers: [TrabajosController],
  providers: [TrabajosService],
  exports: [TypeOrmModule, TrabajosService],
})
export class TrabajosModule {}
