import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';
import { Proveedor } from './entities/proveedore.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proveedor]),
  ],
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
  exports: [
    ProveedoresService,
    TypeOrmModule
  ],
})
export class ProveedoresModule { }
