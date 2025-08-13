import { Type } from 'class-transformer';
import { IsUUID, IsArray,  ValidateNested, IsNumber, IsOptional, IsISO8601, } from 'class-validator';

export class CreateVentaDto {  

  @IsUUID()
  @IsOptional()
  id_persona?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetalleVentaDto)
  detalleVentas: DetalleVentaDto[];

  @IsNumber({ maxDecimalPlaces: 2 })
  monto_total: number;
  
  @IsISO8601()
  @IsOptional()
  fecha_venta?: string;
}

export class DetalleVentaDto {
  @IsUUID()
  id_trabajo: string;  
}