import { forwardRef, Module } from '@nestjs/common';
import { PmpService } from './pmp.service';
import { PmpController } from './pmp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pmp } from './entities/pmp.entity';
import { ProductosModule } from '../productos/productos.module';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pmp]),
    forwardRef(() => ProductosModule),
    CommonModule,
    AuthModule
  ],
  controllers: [PmpController],
  providers: [PmpService],
  exports: [
    PmpService,
    TypeOrmModule
  ]
})
export class PmpModule { }
