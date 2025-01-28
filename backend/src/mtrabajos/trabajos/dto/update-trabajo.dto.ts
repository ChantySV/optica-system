import { PartialType } from '@nestjs/mapped-types';
import { CreateTrabajoDto } from './create-trabajo.dto';
import { IsOptional, IsDate, IsBoolean, IsEnum } from 'class-validator';

export enum TrabajoEstado {
    PENDIENTE = 'pendiente',
    COMPLETADO = 'completado',
    CANCELADO = 'cancelado',
}

export class UpdateTrabajoDto extends PartialType(CreateTrabajoDto) {
    @IsOptional()
    @IsDate()
    fecha_salida?: Date;

    @IsOptional()
    @IsBoolean()
    activo?: boolean;

    @IsOptional()
    @IsEnum(TrabajoEstado)
    estado?: TrabajoEstado;
}
