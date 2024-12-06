import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Permiso } from 'src/roles-permisos/permisos/entities/permiso.entity';
import { Role } from './role.entity';


@Entity('rolesPermisos')
export class RolePermiso {
  @PrimaryGeneratedColumn('uuid')
  id_rolPermiso: string;

  @ManyToOne(() => Role, (role) => role.rolePermisos, { nullable: false })
  @JoinColumn({ name: 'id_rol' })
  role: Role;

  @ManyToOne(() => Permiso, (permiso) => permiso.rolePermisos, { nullable: false })
  @JoinColumn({ name: 'id_permiso' })
  permiso: Permiso;
}
