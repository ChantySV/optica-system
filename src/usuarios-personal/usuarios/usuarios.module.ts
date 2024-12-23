import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from 'src/roles-permisos/roles/roles.module';
import { PersonalModule } from '../personal/personal.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    PersonalModule,
    RolesModule,
    ConfigModule, 
    CommonModule,

    TypeOrmModule.forFeature([Usuario]),

    PassportModule.register({
      defaultStrategy: 'jwt'
    }),

    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService],
      
      useFactory: ( configService: ConfigService ) => {        
        // console.log('JWT', configService.get('JWT_SECRET'));
        // console.log('JWT', process.env.JWT_SECRET);
        return{          
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h'
          }
        }
      }
      
    })
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, JwtStrategy ],
  exports: [
    UsuariosService,
    JwtStrategy,
    PassportModule,
    JwtModule,    
  ],
})
export class UsuariosModule { }
