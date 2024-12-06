import { IsDate, IsDecimal, IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class CreateTrabajoDto {

  @IsDate()
  fecha_salida: Date;

  @IsDecimal()
  costo: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsUUID()
  id_detalleTrabajo: string;

  @IsUUID()
  id_personal: string;
}
