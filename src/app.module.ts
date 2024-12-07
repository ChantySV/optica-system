import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EnvConfiguration } from './config/env.config';
import { CommonModule } from './common/common.module';
import { RolesPermisosModule } from './roles-permisos/roles-permisos.module';
import { UsuariosPersonalModule } from './usuarios-personal/usuarios-personal.module';
import { ProveedoresProductosModule } from './proveedores-productos/proveedores-productos.module';
import { MventasModule } from './mventas/mventas.module';
import { OpticasModule } from './opticas/opticas.module';
import { MtrabajosModule } from './mtrabajos/mtrabajos.module';


@Module({
  imports: [
    ConfigModule.forRoot({ load: [EnvConfiguration], }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }), CommonModule, RolesPermisosModule, UsuariosPersonalModule, ProveedoresProductosModule, MventasModule, OpticasModule, MtrabajosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
