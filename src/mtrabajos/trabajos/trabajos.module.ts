import { Module } from '@nestjs/common';
import { TrabajosService } from './trabajos.service';
import { TrabajosController } from './trabajos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trabajo } from './entities/trabajo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Trabajo ]),     
  ],
  controllers: [TrabajosController],
  providers: [TrabajosService],
  exports: [TrabajosService],
})
export class TrabajosModule {}
