import { Module } from '@nestjs/common';
import { TrabajosService } from './trabajos.service';
import { TrabajosController } from './trabajos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleTrabajo, Trabajo } from './entities';
import { PersonalModule } from 'src/personal/personal.module';
import { TratamientosModule } from 'src/tratamientos/tratamientos.module';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
  imports:[
    TypeOrmModule.forFeature(
      [ DetalleTrabajo, Trabajo ]
    ),
    PersonalModule,
    TratamientosModule,
    ProductosModule,    
  ],
  controllers: [TrabajosController],
  providers: [TrabajosService],
  exports: [TypeOrmModule, TrabajosService],
})
export class TrabajosModule {}
