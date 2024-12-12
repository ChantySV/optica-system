import { Module } from '@nestjs/common';
import { ColoresService } from './colores.service';
import { ColoresController } from './colores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './entities/colore.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([ Color ]), 
    CommonModule,    
  ],
  controllers: [ ColoresController ],
  providers: [ ColoresService ],
  exports:[ ColoresService ]
})
export class ColoresModule {}
