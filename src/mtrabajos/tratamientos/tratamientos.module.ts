import { Module } from '@nestjs/common';
import { TratamientosService } from './tratamientos.service';
import { TratamientosController } from './tratamientos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tratamiento } from './entities/tratamiento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tratamiento]), // Registra la entidad Tratamiento    
  ],
  controllers: [TratamientosController],
  providers: [TratamientosService],
  exports: [TratamientosService],
})
export class TratamientosModule {}
