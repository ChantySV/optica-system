import { Module } from '@nestjs/common';
import { TratamientosService } from './tratamientos.service';
import { TratamientosController } from './tratamientos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color, Tratamiento } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Tratamiento, Color ])],
  controllers: [TratamientosController],
  providers: [TratamientosService],
  exports: [
    TypeOrmModule, 
    TratamientosService
  ]
})
export class TratamientosModule {}
