import { Module } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { PersonalController } from './personal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personal } from './entities/personal.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ Personal ])],
  controllers: [ PersonalController ],
  providers: [ PersonalService ],
  exports: [ 
    PersonalService, 
    TypeOrmModule 
  ],
})
export class PersonalModule {}
