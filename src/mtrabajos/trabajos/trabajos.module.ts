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

@Module({
  imports: [
    TypeOrmModule.forFeature([ Trabajo, DetalleTrabajo ]), 
    PersonalModule,
    CommonModule,        
    TrabajosModule,
    AuthModule,
  ],
  controllers: [TrabajosController],
  providers: [TrabajosService],
  exports: [TypeOrmModule, TrabajosService],
})
export class TrabajosModule {}
