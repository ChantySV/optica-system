import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ColoresModule } from './colores/colores.module';
import { DetalleTrabajosModule } from './detalle-trabajos/detalle-trabajos.module';
import { TrabajosModule } from './trabajos/trabajos.module';
import { TratamientosModule } from './tratamientos/tratamientos.module';

import { Color } from './colores/entities/colore.entity';
import { DetalleTrabajo } from './detalle-trabajos/entities/detalle-trabajo.entity';
import { Trabajo } from './trabajos/entities/trabajo.entity';
import { Tratamiento } from './tratamientos/entities/tratamiento.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([
            Color, DetalleTrabajo, Trabajo, Tratamiento
        ]),
        ColoresModule,
        DetalleTrabajosModule,
        TratamientosModule,
        TrabajosModule,
    ],
    exports:[
        TypeOrmModule
    ]
})
export class MtrabajosModule {}
