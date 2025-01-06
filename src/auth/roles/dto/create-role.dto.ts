import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  nombre_rol: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
