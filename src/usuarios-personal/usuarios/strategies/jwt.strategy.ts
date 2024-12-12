import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Usuario } from "../entities/usuario.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { config } from "process";
import { ConfigService } from "@nestjs/config";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { Injectable, UnauthorizedException } from "@nestjs/common";


@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ){

    constructor(
        @InjectRepository( Usuario )
        private readonly usuarioRepository: Repository<Usuario>,

        configService: ConfigService 
    ) {

        super({            
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })

    }


    async validate( payload: JwtPayload): Promise<Usuario>{

        const { nombre_usuario } = payload;

        const user = await this.usuarioRepository.findOneBy({ nombre_usuario });

        if ( !user ) throw new UnauthorizedException(' Token not valid ')

        if ( ! user.activo ) throw new UnauthorizedException(' Usuario no activo ')


        return user;
    }

}