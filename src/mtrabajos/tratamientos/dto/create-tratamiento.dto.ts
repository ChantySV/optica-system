import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateTratamientoDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
