import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from 'src/usuarios-personal/usuarios/entities/usuario.entity';
import { RolePermiso } from './rol-permiso.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id_rol: string;

  @Column({ unique: true })
  nombre_rol: string;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => Usuario, (usuario) => usuario.role)
  usuarios: Usuario[];

  @OneToMany(() => RolePermiso, (rolePermiso) => rolePermiso.role)
  rolePermisos: RolePermiso[];
}
