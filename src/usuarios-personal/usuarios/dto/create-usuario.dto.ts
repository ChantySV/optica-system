import { IsString, IsOptional, IsBoolean, IsUUID } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  nombre_usuario: string;

  @IsString()
  contraseña: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsUUID()
  @IsOptional()
  id_rol?: string;

  @IsUUID()
  @IsOptional()
  id_personal?: string;
}
