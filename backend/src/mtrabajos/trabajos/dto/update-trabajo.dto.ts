import { 
    IsDate, IsUUID, IsOptional, IsBoolean, IsDecimal, IsInt, ValidateNested, 
    IsNumber, IsPositive, IsNegative 
  } from 'class-validator';
  import { Transform, Type } from 'class-transformer';
  
  class DetalleTrabajoDto {
    @IsBoolean()
    @IsOptional()
    distancia?: boolean;
    
    @IsInt()
    @IsOptional()
    adicion?: number;
  
    @IsInt()
    @IsOptional()
    base?: number;
  
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    @IsOptional()
    esferico_derecho?: number;
  
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    @IsOptional()
    esferico_izquierdo?: number;
  
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsOptional()
    @IsNegative()
    cilindro_derecho?: number;
  
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsOptional()
    @IsNegative()
    cilindro_izquierdo?: number;
  
    @IsInt()
    @IsOptional()
    eje_derecho?: number;
  
    @IsInt()
    @IsOptional()
    eje_izquierdo?: number;
  
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
  
  export class UpdateTrabajoDto {
      @IsInt()
    @IsOptional()
    numero_trabajo?: number;
    
    @IsUUID()
    @IsOptional()
    id_personal?: string;
  
    @ValidateNested()
    @IsOptional()
    @Type(() => DetalleTrabajoDto)
    detalleTrabajo?: DetalleTrabajoDto;
  }
  