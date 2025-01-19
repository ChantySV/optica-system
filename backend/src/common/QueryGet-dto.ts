import { IsOptional, IsString, IsEnum } from "class-validator";

export class QueryGetDto {
    @IsOptional()
    @IsString()
    sortBy?: string;

    @IsOptional()
    @IsEnum(['ASC', 'DESC'], { message: 'order debe ser ASC o DESC' })
    order?: 'ASC' | 'DESC';
}