import { IsInt, IsDecimal, IsUUID, IsOptional } from 'class-validator';

export class CreateDetalleVentaDto {
  @IsInt()
  cantidad: number;

  @IsDecimal()
  precio_unitario: number;

  @IsDecimal()
  total_parcial: number;

  @IsUUID()
  @IsOptional()
  id_venta?: string;

  @IsUUID()
  @IsOptional()
  id_trabajo?: string;
}
