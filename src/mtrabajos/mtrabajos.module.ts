import { Module } from '@nestjs/common';

import { ColoresModule } from './colores/colores.module';
import { TrabajosModule } from './trabajos/trabajos.module';
import { TratamientosModule } from './tratamientos/tratamientos.module';

import { CommonModule } from 'src/common/common.module';

@Module({
    imports:[        
        ColoresModule,
        TratamientosModule,
        TrabajosModule,
        CommonModule,
    ],
    exports:[
        ColoresModule,
        TratamientosModule,
        TrabajosModule,
        CommonModule
    ]
})
export class MtrabajosModule {}
