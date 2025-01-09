import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';
import { Proveedor } from './entities/proveedore.entity';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proveedor]),
    CommonModule,
    AuthModule,
  ],
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
  exports: [
    ProveedoresService,
    TypeOrmModule
  ],
})
export class ProveedoresModule { }
