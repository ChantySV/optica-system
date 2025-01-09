import { IsString, IsEmail, IsInt, IsOptional, IsBoolean, IsPhoneNumber } from 'class-validator';

export class CreatePersonalDto {
  @IsString()
  nombres: string;

  @IsString()
  apellido_paterno: string;

  @IsString()
  @IsOptional()
  apellido_materno?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsInt()  
  @IsOptional()
  telefono?: number;

  @IsString()    
  tipo_persona: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
