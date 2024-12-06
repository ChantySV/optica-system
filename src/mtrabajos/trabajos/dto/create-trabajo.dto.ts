import { IsDate, IsDecimal, IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class CreateTrabajoDto {
  @IsDate()
  fecha_entrada: Date;

  @IsDate()
  fecha_salida: Date;

  @IsDecimal()
  costo: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsUUID()
  @IsOptional()
  id_detalleTrabajo?: string;

  @IsUUID()
  @IsOptional()
  id_personal?: string;
}
