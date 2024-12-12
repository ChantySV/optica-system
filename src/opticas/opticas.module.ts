import { Module } from '@nestjs/common';
import { OpticasService } from './opticas.service';
import { OpticasController } from './opticas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Optica } from './entities/optica.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports:[TypeOrmModule.forFeature([ Optica ]), 
  CommonModule,
  ],
  controllers: [OpticasController],
  providers: [OpticasService],
  exports:[ OpticasService ]
})
export class OpticasModule {}
