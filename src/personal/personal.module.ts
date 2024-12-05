import { Module } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { PersonalController } from './personal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personal } from './entities/personal.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Personal]),
    
  ],
  controllers: [PersonalController],
  providers: [PersonalService],
  exports: [TypeOrmModule, PersonalService],
})
export class PersonalModule { }
