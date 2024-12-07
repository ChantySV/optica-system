import { Module } from '@nestjs/common';

import { UsuariosModule } from './usuarios/usuarios.module';
import { PersonalModule } from './personal/personal.module';
import { LogModule } from './log/log.module';


@Module({
  imports: [
    UsuariosModule,
    PersonalModule,
    LogModule
  ],
  exports: [
    UsuariosModule,
    PersonalModule,
    LogModule
  ]
})
export class UsuariosPersonalModule { }
