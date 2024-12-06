import { IsDecimal, IsDate, IsOptional, IsBoolean, IsUUID } from 'class-validator';

export class CreateVentaDto {
  @IsDecimal()
  monto_total: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsUUID()
  @IsOptional()
  id_optica?: string;

  @IsUUID()
  @IsOptional()
  id_usuario?: string;
}
