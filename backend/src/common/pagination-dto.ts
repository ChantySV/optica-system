import { Type } from "class-transformer";
import { IsOptional, IsPositive, Max, Min } from "class-validator";

export class PaginationDto {

    @IsOptional()    
    @Type( () => Number )
    @Min(1)
    @Max(10)
    limit ?= 10;

    @IsOptional()    
    @Type( () => Number )
    @Min(0)
    offset ?= 0;

}