import { IsString, IsOptional, IsBoolean, IsUUID, Min, Matches, Max, MaxLength, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  nombre_usuario: string;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  contrasenha: string;

  @IsBoolean()
  @IsOptional()
  activo: boolean;

  @IsUUID()  
  id_rol: string;

  @IsUUID() 
  id_personal: string;
}
