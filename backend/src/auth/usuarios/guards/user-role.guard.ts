import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { META_ROLES } from '../decorators/role-protected.decorator'



@Injectable()
export class UserRoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const validRoles: string[] = this.reflector.get<string[]>(META_ROLES, context.getHandler()) || [];
      const req = context.switchToHttp().getRequest();
      const user = req.user;
  
      if (!user) {
        throw new UnauthorizedException('Usuario no autenticado');
      }
  
      if (validRoles.length === 0) {
        return false; 
      }
  
      if (user.role.nombre_rol === 'admin') {
        return true; 
      }
  
      if (!validRoles.includes(user.role.nombre_rol)) {
        throw new UnauthorizedException('No tiene permisos para acceder a este recurso');
      }
  
      return true;
    }
  }