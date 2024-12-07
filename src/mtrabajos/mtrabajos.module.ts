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
import { CommonModule } from 'src/common/common.module';

@Module({
    imports:[        
        ColoresModule,
        DetalleTrabajosModule,
        TratamientosModule,
        TrabajosModule,
        CommonModule
    ],
    exports:[
        ColoresModule,
        DetalleTrabajosModule,
        TratamientosModule,
        TrabajosModule,
        CommonModule
    ]
})
export class MtrabajosModule {}
