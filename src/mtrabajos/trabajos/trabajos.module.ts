import { Module } from '@nestjs/common';
import { TrabajosService } from './trabajos.service';
import { TrabajosController } from './trabajos.controller';

@Module({
  controllers: [TrabajosController],
  providers: [TrabajosService],
})
export class TrabajosModule {}
