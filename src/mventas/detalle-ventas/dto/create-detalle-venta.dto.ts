import { IsInt, IsDecimal, IsUUID, IsOptional } from 'class-validator';

export class CreateDetalleVentaDto {
  @IsInt()
  cantidad: number;

  @IsDecimal()
  precio_unitario: number;

  @IsUUID()  
  id_venta: string;

  @IsUUID()  
  id_trabajo: string;
}
