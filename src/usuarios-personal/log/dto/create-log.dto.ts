import { IsString, IsDate, IsUUID, IsOptional } from 'class-validator';

export class CreateLogDto {
  @IsString()
  accion: string;

  @IsDate()
  fecha_hora: Date;

  @IsString()
  ip_origen: string;

  @IsUUID()
  @IsOptional()
  id_usuario?: string;
}
