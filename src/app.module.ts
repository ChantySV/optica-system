import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EnvConfiguration } from './config/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PersonalModule } from './personal/personal.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ProductosModule } from './productos/productos.module';
import { TrabajosModule } from './trabajos/trabajos.module';
import { VentasModule } from './ventas/ventas.module';
import { OpticasModule } from './opticas/opticas.module';
import { TratamientosModule } from './tratamientos/tratamientos.module';


@Module({
  imports: [
    ConfigModule.forRoot({ load: [ EnvConfiguration ], }), 
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,
    synchronize: true
  }), AuthModule, PersonalModule, ProveedoresModule, ProductosModule, TrabajosModule, VentasModule, OpticasModule, TratamientosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
