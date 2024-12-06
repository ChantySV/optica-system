import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { PermisosModule } from './permisos/permisos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permiso } from './permisos/entities/permiso.entity';
import { Role, RolePermiso } from './roles/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Permiso, Role, RolePermiso
    ]),
    RolesModule, PermisosModule
  ],
  exports:[
    TypeOrmModule
]
})
export class RolesPermisosModule {}
