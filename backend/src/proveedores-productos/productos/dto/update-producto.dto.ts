import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { IsString, IsOptional, IsInt, IsDecimal, IsBoolean, IsUUID, IsNumber } from 'class-validator';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
    @IsString()
  @IsOptional()
  nombre?: string;

  @IsInt()
  @IsOptional()
  stock?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  precio_compra: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  precio_venta: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsUUID()
  @IsOptional()
  id_proveedor?: string;
}
