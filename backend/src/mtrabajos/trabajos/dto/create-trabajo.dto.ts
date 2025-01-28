import { IsDate, IsUUID, IsOptional, IsBoolean, IsDecimal, IsInt, ValidateNested, IsNumber, IsPositive, IsNegative, IsISO8601, isInt } from 'class-validator';
import { Type } from 'class-transformer';

class DetalleTrabajoDto {
  @IsBoolean()
  distancia: boolean;
  
  @IsInt()
  @IsOptional()
  adicion?: number;

  @IsInt()
  @IsOptional()
  base?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsOptional()
  esferico_derecho?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsOptional()
  esferico_izquierdo?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @IsNegative()
  cilindro_derecho?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @IsNegative()
  cilindro_izquierdo?: number;

  @IsInt()
  @IsOptional()
  eje_derecho?: number;

  @IsInt()
  @IsOptional()
  eje_izquierdo?: number;

  @IsUUID()
  @IsOptional()
  id_tratamiento: string;

  @IsUUID()
  id_producto: string;

  @IsUUID()
  @IsOptional()
  id_color?: string;
}

export class CreateTrabajoDto {
  @IsISO8601()
  @IsOptional()
  fecha_salida?: Date; 

  @IsInt()
  numero_trabajo: number;
  
  @IsUUID()
  id_personal: string;

  @ValidateNested()
  @Type(() => DetalleTrabajoDto)
  detalleTrabajo: DetalleTrabajoDto;
}
