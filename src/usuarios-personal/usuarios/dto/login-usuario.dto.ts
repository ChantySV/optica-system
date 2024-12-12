import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginUsuarioDto {
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

}
