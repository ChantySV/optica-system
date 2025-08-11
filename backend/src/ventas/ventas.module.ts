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
import { Pmp } from 'src/proveedores-productos/pmp/entities/pmp.entity';
import { PmpModule } from 'src/proveedores-productos/pmp/pmp.module';

@Module({
  imports:[ 
    TypeOrmModule.forFeature([ Venta, DetalleVenta ]),
    CommonModule,
    PersonalModule,    
    TrabajosModule,
    AuthModule,
    PmpModule,
  ],  
  controllers: [ VentasController ],
  providers: [ VentasService ],
  exports: [ TypeOrmModule, VentasService ]
})
export class VentasModule {}
