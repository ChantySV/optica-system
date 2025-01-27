import { IsOptional, IsString, IsIn } from 'class-validator';


export class queryResponseUsuarioDto {
  @IsOptional()
  @IsString()
  @IsIn(['nombre_usuario', 'activo', 'nombre_rol', 'nombres'])
  sortBy?: string = 'nombre_usuario';
}
