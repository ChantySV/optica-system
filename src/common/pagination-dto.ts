import { Type } from "class-transformer";
import { IsOptional, IsPositive, Max, Min } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Type( () => Number )
    @Max(10)
    limit ?= 10;

    @IsOptional()
    @IsPositive()
    @Type( () => Number )
    @Min(0)
    offset ?= 0;

}