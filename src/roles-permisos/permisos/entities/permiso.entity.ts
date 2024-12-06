import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolePermiso } from 'src/roles-permisos/roles/entities';

@Entity('permisos')
export class Permiso {
  @PrimaryGeneratedColumn('uuid')
  id_permiso: string;

  @Column( 'varchar', { unique: true } )
  nombre_opcion: string;

  @Column( 'varchar', { unique: true } )
  ruta_opcion: string;

  @Column( 'boolean', { default: true } )
  activo: boolean;

  @OneToMany(() => RolePermiso, (rolePermiso) => rolePermiso.permiso)
  rolePermisos: RolePermiso[];
}
