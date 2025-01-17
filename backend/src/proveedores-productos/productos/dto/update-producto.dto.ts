import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { IsString, IsOptional, IsInt, IsDecimal, IsBoolean, IsUUID } from 'class-validator';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
    @IsString()
  @IsOptional()
  nombre?: string;

  @IsInt()
  @IsOptional()
  stock?: number;

  @IsDecimal()
  @IsOptional()
  precio_compra?: number;

  @IsDecimal()
  @IsOptional()
  precio_venta?: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsUUID()
  @IsOptional()
  id_proveedor?: string;
}
