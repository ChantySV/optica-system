import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateColoreDto {
    @IsString()
    nombre: string;

    @IsBoolean()
    @IsOptional()
    activo?: boolean; // Opcional porque tiene valor por defecto
}
