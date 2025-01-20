import { IsOptional, IsString, IsIn, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryProductoDto {  
  @IsOptional()
  @IsString()
  @IsIn(['nombre', 'precio_compra', 'precio_venta', 'stock', 'proveedores'])
  sortBy?: string = 'nombre';
}
