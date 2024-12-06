import { IsString, IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLogDto {
  @IsUUID()
  @IsNotEmpty()
  id_usuario: string; // Clave foránea hacia Usuario

  @IsString()
  @IsOptional() // Es opcional porque la columna `accion` permite valores nulos
  accion?: string;

  @IsString()
  @IsNotEmpty()
  ip_origen: string; // Dirección IP de origen
}
