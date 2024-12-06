import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateOpticaDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsOptional()
  numero?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
