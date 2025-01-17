import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });

    if (!configService.get('JWT_SECRET')) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }
  }

  async validate(payload: JwtPayload): Promise<Usuario> {
    try {
      const { id_usuario } = payload;

      const user = await this.usuarioRepository.findOne({
        where: { id_usuario, activo: true },
        relations: ['role'],
      });

      if (!user) {
        throw new UnauthorizedException('Token not valid: User not found');
      }

      if (!user.activo) {
        throw new UnauthorizedException('User is not active');
      }      
      
      return user;

    } catch (error) {      
      console.error('Error during JWT validation:', error.message);
      throw new UnauthorizedException('Invalid authentication token');
    }
  }
}
