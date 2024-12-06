import { IsBoolean, IsDecimal, IsIn, IsInt, IsNegative, IsOptional, IsPositive, IsUUID } from 'class-validator';

export class CreateDetalleTrabajoDto {

    @IsBoolean()
    distancia: boolean;

    @IsDecimal()
    @IsOptional()
    esferico_derecho?: number;

    @IsDecimal()
    @IsOptional()
    esferico_izquierdo?: number;

    @IsDecimal()
    @IsOptional()
    @IsNegative()
    cilindro_derecho?: number;

    @IsDecimal()
    @IsOptional()
    @IsNegative()
    cilindro_izquierdo?: number;

    @IsInt()
    @IsOptional()
    eje_derecho?: number;

    @IsInt()
    @IsOptional()
    eje_izquierdo?: number;

    @IsInt()
    @IsOptional()
    @IsPositive()
    prisma_izquierdo?: number;

    @IsInt()
    @IsOptional()
    @IsPositive()
    prisma_derecho?: number;

    @IsInt()
    @IsOptional()
    base_izquierdo?: number;

    @IsInt()
    @IsOptional()
    base_derecho?: number;

    @IsInt()
    @IsOptional()
    @IsPositive()
    adicion_izquierdo?: number;

    @IsInt()
    @IsOptional()
    @IsPositive()
    adicion_derecho?: number;

    @IsInt()
    @IsOptional()
    @IsPositive()
    altura_izquierdo?: number;

    @IsInt()
    @IsOptional()
    @IsPositive()
    altura_derecho?: number;

    @IsDecimal()
    @IsOptional()
    @IsPositive()
    dip_izquierdo?: number

    @IsDecimal()
    @IsOptional()
    @IsPositive()
    dip_derecho?: number

    @IsUUID()
    @IsOptional()
    id_tratamiento?: string;

    @IsUUID()
    @IsOptional()
    id_producto?: string;

    @IsUUID()
    @IsOptional()
    id_color?: string;
}
