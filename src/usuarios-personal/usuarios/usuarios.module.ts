import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from 'src/roles-permisos/roles/roles.module';
import { PersonalModule } from '../personal/personal.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([ Usuario ]),
    PersonalModule,
    RolesModule
  ],
  controllers: [ UsuariosController ],
  providers: [ UsuariosService ],
  exports: [ 
    UsuariosService,
   ],
})
export class UsuariosModule {}
