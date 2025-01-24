import { IsOptional, IsString, IsIn } from 'class-validator';

export class QueryTrabajoDto {  
  @IsOptional()
  @IsString()
  @IsIn(['numero_trabajo', 'fecha_entrada', 'fecha_salida', 'estado'])
  sortBy?: string = 'numero_trabajo';
}
