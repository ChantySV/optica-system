import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreatePermisoDto {
  @IsString()
  nombre_opcion: string;

  @IsString()
  ruta_opcion: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
