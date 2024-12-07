import { Module } from '@nestjs/common';
import { ColoresService } from './colores.service';
import { ColoresController } from './colores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './entities/colore.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ Color ]),    
  ],
  controllers: [ ColoresController ],
  providers: [ ColoresService ],
  exports:[ ColoresService ]
})
export class ColoresModule {}
