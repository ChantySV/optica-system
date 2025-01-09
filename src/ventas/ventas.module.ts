import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { Venta } from './entities/venta.entity';
import { DetalleVenta } from './entities/detalle-venta.entity';

import { CommonModule } from 'src/common/common.module';
import { PersonalModule } from 'src/personal/personal.module';
import { TrabajosModule } from 'src/mtrabajos/trabajos/trabajos.module';
import { UsuariosModule } from 'src/auth/usuarios/usuarios.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[ 
    TypeOrmModule.forFeature([ Venta, DetalleVenta ]),
    CommonModule,
    PersonalModule,    
    TrabajosModule,
    AuthModule
  ],  
  controllers: [ VentasController ],
  providers: [ VentasService ],
  exports: [ TypeOrmModule, VentasService ]
})
export class VentasModule {}
