import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
    imports:[
        RolesModule,
        UsuariosModule,
    ],
    exports:[
        RolesModule,
        UsuariosModule,
    ]
})
export class AuthModule {}
