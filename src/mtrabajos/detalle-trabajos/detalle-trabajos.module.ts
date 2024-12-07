import { Module } from '@nestjs/common';
import { DetalleTrabajosService } from './detalle-trabajos.service';
import { DetalleTrabajosController } from './detalle-trabajos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleTrabajo } from './entities/detalle-trabajo.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ DetalleTrabajo ])
  ],
  controllers: [ DetalleTrabajosController ],
  providers: [ DetalleTrabajosService ],
  exports: [ DetalleTrabajosService ]
})
export class DetalleTrabajosModule {}
