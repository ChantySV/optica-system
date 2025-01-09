import { Type } from 'class-transformer';
import { IsUUID, IsArray,  ValidateNested, IsNumber, } from 'class-validator';

export class CreateVentaDto {  

  @IsUUID()
  id_persona: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetalleVentaDto)
  detalleVentas: DetalleVentaDto[];
}

export class DetalleVentaDto {
  @IsUUID()
  id_trabajo: string;  
}