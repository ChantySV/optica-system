import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolePermiso } from 'src/roles-permisos/roles/entities';

@Entity('permisos')
export class Permiso {
  @PrimaryGeneratedColumn('uuid')
  id_permiso: string;

  @Column({ unique: true })
  nombre_opcion: string;

  @Column({ unique: true })
  ruta_opcion: string;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => RolePermiso, (rolePermiso) => rolePermiso.permiso)
  rolePermisos: RolePermiso[];
}
