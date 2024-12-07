import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateColoreDto {
    @IsString()
    nombre: string;

    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}
