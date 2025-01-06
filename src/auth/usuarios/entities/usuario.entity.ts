import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Personal } from 'src/personal/entities/personal.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id_usuario: string;

  @Column('varchar', { unique: true })
  nombre_usuario: string;

  @Column('varchar', { select: false })
  contrasenha: string;

  @Column('boolean', { default: true })
  activo: boolean;

  @ManyToOne(() => Role, (role) => role.usuarios, { nullable: false })
  @JoinColumn({ name: 'id_rol' })
  role: Role;

  @OneToOne(() => Personal, (personal) => personal.usuario, { nullable: false })
  @JoinColumn({ name: 'id_personal' })
  personal: Personal;
  
}
