import { Module } from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { PermisosController } from './permisos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permiso } from './entities/permiso.entity';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([ Permiso ]),    
    CommonModule],
  controllers: [ PermisosController ],
  providers: [ PermisosService ],
  exports: [ 
    PermisosService,
    TypeOrmModule
   ]
})
export class PermisosModule {}
