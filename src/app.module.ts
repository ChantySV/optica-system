import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EnvConfiguration } from './config/env.config';
import { CommonModule } from './common/common.module';
import { ProveedoresProductosModule } from './proveedores-productos/proveedores-productos.module';
import { MtrabajosModule } from './mtrabajos/mtrabajos.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';
import { VentasModule } from './ventas/ventas.module';
import { NestApplication } from '@nestjs/core';
import { TokenRefreshMiddleware } from './common/middlewares/token-refresh.middleware';


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
    }), CommonModule, ProveedoresProductosModule, MtrabajosModule, SeedModule, AuthModule, VentasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenRefreshMiddleware)
      .exclude(
        { path: 'usuarios/sign-up', method: RequestMethod.POST}
      )
      .forRoutes('*');
  }
}