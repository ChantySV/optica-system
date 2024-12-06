import { IsString, IsInt, IsDecimal, IsOptional, IsBoolean } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre: string;

  @IsInt()
  stock: number;

  @IsDecimal()
  precio_compra: number;

  @IsDecimal()
  precio_venta: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
