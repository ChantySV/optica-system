import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuariosModule } from './usuarios/usuarios.module';
import { PersonalModule } from './personal/personal.module';
import { LogModule } from './log/log.module';

import { Usuario } from './usuarios/entities/usuario.entity';
import { Personal } from './personal/entities/personal.entity';
import { Log } from './log/entities/log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Log, Usuario, Personal
    ]),
    UsuariosModule, 
    PersonalModule, 
    LogModule
  ],
    exports:[ 
      TypeOrmModule 
    ]
})
export class UsuariosPersonalModule {}
