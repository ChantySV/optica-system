import { IsDate, IsUUID, IsOptional, IsBoolean, IsDecimal, IsInt, ValidateNested, IsNumber, IsPositive, IsNegative, IsISO8601, isInt } from 'class-validator';
import { Type } from 'class-transformer';

class DetalleTrabajoDto {
  @IsBoolean()
  distancia: boolean;

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

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  prisma_izquierdo?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  prisma_derecho?: number;

  @IsInt()
  @IsOptional()
  base_izquierdo?: number;

  @IsInt()
  @IsOptional()
  base_derecho?: number;

  @IsInt()
  @IsOptional()
  @IsPositive()
  adicion_izquierdo?: number;

  @IsInt()
  @IsOptional()
  @IsPositive()
  adicion_derecho?: number;

  @IsInt()
  @IsOptional()
  @IsPositive()
  altura_izquierdo?: number;

  @IsInt()
  @IsOptional()
  @IsPositive()
  altura_derecho?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsOptional()
  dip_izquierdo?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsOptional()
  dip_derecho?: number;

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
