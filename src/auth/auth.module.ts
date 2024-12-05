import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { Usuario, Log, Permiso, Rol } from './entities';
import { PersonalModule } from 'src/personal/personal.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([ Usuario, Rol, Permiso, Log ]),
    PersonalModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[ AuthService ]
})
export class AuthModule {}
