import { IsOptional, IsString, IsIn } from 'class-validator';

export class QueryPersonalDto {  
  @IsOptional()
  @IsString()
  @IsIn(['nombres', 'apellido_paterno', 'email', 'telefono'])
  sortBy?: string = 'nombres';
}
