import { IsString, IsOptional, IsBoolean, IsUrl } from 'class-validator';

export class CreateProveedoreDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  numero?: string;

  @IsString()
  @IsUrl()
  direccion_web: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
