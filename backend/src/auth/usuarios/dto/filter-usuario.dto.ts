import { IsOptional, IsString } from 'class-validator';

export class FilterUsuarioDto {
  @IsOptional()
  @IsString()
  nombre_usuario?: string;

  @IsOptional()
  @IsString()
  nombre_rol?: string;

  @IsOptional()
  @IsString()
  nombres?: string;
}
