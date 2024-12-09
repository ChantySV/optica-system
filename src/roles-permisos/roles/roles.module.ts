import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, RolePermiso } from './entities';
import { PermisosModule } from '../permisos/permisos.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([ Role, RolePermiso ]),
    PermisosModule
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [
    RolesService, 
    TypeOrmModule
  ],
})
export class RolesModule {}
