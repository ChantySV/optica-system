import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TokenRefreshMiddleware implements NestMiddleware {
  private readonly TOKEN_REFRESH_THRESHOLD = +this.configService.get<string>('JWT_REFRESH') * 60; 

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const token = authHeader.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
        ignoreExpiration: false,
      });

      const currentTime = Math.floor(Date.now() / 1000); 
      const timeLeft = payload.exp - currentTime;

      if (timeLeft < this.TOKEN_REFRESH_THRESHOLD) {        
        const newToken = this.jwtService.sign(
          { id_usuario: payload.id_usuario },
          { secret: this.configService.get<string>('JWT_SECRET'), expiresIn: this.configService.get<string>('JWT_TIME') },
        );
        res.setHeader('x-new-token', newToken);
      }      
      req['user'] = payload;
      next();
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
