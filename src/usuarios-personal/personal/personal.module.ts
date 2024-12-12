import { Module } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { PersonalController } from './personal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personal } from './entities/personal.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([ Personal ]),
    CommonModule,
  ],
  controllers: [ PersonalController ],
  providers: [ PersonalService ],
  exports: [ 
    PersonalService, 
    TypeOrmModule 
  ],
})
export class PersonalModule {}
