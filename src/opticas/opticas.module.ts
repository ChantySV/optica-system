import { Module } from '@nestjs/common';
import { OpticasService } from './opticas.service';
import { OpticasController } from './opticas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Optica } from './entities/optica.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ Optica ])
  ],
  controllers: [OpticasController],
  providers: [OpticasService],
  exports: [TypeOrmModule, OpticasService]
})
export class OpticasModule {}
