import { Module } from '@nestjs/common';
import { TratamientosService } from './tratamientos.service';
import { TratamientosController } from './tratamientos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tratamiento } from './entities/tratamiento.entity';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tratamiento]), 
    CommonModule,
    AuthModule,
  ],
  controllers: [TratamientosController],
  providers: [TratamientosService],
  exports: [TratamientosService],
})
export class TratamientosModule {}
