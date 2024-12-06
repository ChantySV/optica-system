import { Module } from '@nestjs/common';
import { DetalleTrabajosService } from './detalle-trabajos.service';
import { DetalleTrabajosController } from './detalle-trabajos.controller';

@Module({
  controllers: [DetalleTrabajosController],
  providers: [DetalleTrabajosService],
})
export class DetalleTrabajosModule {}
