import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([ Role ]),
    CommonModule,
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [
    RolesService, 
    TypeOrmModule
  ],
})
export class RolesModule {}
