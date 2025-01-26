import { IsOptional, IsString, IsIn } from 'class-validator';

export class QueryVentaDto {  
  @IsOptional()
  @IsString()
  @IsIn([ 'monto_total', 'usuario', 'fecha_venta', ])
  sortBy?: string = 'monto_total';
}
