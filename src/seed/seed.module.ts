import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { RolesModule } from 'src/roles-permisos/roles/roles.module';
import { PermisosModule } from 'src/roles-permisos/permisos/permisos.module';
import { ProveedoresModule } from 'src/proveedores-productos/proveedores/proveedores.module';
import { ProductosModule } from 'src/proveedores-productos/productos/productos.module';
import { UsuariosModule } from 'src/usuarios-personal/usuarios/usuarios.module';
import { PersonalModule } from 'src/usuarios-personal/personal/personal.module';

@Module({
  imports: [ 
    RolesModule,
    PermisosModule,
    ProveedoresModule,
    ProductosModule,
    UsuariosModule,
    PersonalModule,
    
   ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
