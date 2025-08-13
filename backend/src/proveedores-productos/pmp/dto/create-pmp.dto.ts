import { IsUUID, IsEnum, IsNumber, Min, IsISO8601, IsOptional } from 'class-validator';
import { ConceptoEnum } from '../entities/pmp.entity';

export class CreatePmpDto {
  @IsUUID()
  id_producto: string;

  @IsNumber()
  @Min(1)
  cantidad: number;

  @IsEnum(ConceptoEnum)
  concepto: ConceptoEnum;

  @IsISO8601()
  @IsOptional()
  fecha_venta?: string;
}
