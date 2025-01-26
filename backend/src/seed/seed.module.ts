import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { RolesModule } from 'src/auth/roles/roles.module';
import { ProveedoresModule } from 'src/proveedores-productos/proveedores/proveedores.module';
import { ProductosModule } from 'src/proveedores-productos/productos/productos.module';
import { UsuariosModule } from 'src/auth/usuarios/usuarios.module';
import { PersonalModule } from 'src/personal/personal.module';
import { CommonModule } from 'src/common/common.module';
import { TratamientosModule } from 'src/mtrabajos/tratamientos/tratamientos.module';
import { ColoresModule } from 'src/mtrabajos/colores/colores.module';
import { TrabajosModule } from 'src/mtrabajos/trabajos/trabajos.module';

@Module({
  imports: [ 
    RolesModule,
    ProveedoresModule,
    ProductosModule,
    UsuariosModule,
    PersonalModule, 
    CommonModule,
    TratamientosModule,
    ColoresModule,
    TrabajosModule
   ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
