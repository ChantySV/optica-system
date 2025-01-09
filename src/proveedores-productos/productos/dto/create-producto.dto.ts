import { IsString, IsUUID, IsInt, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre: string;

  @IsInt()
  stock: number;
  
  @IsNumber({ maxDecimalPlaces: 2 })
  precio_compra: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  precio_venta: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsUUID()
  id_proveedor: string; // Incluimos el ID del proveedor aquí
}
