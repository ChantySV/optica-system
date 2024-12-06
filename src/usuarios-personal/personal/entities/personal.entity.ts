import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Usuario } from 'src/usuarios-personal/usuarios/entities/usuario.entity';
import { Trabajo } from 'src/mtrabajos/trabajos/entities/trabajo.entity';

@Entity('personal')
export class Personal {
  @PrimaryGeneratedColumn('uuid')
  id_personal: string;

  @Column('varchar')
  nombres: string;

  @Column('varchar')
  apellido_paterno: string;

  @Column('varchar', { nullable: true })
  apellido_materno: string;

  @Column('varchar', { nullable: true })
  email: string;

  @Column('int', { nullable: false })
  telefono: number;

  @Column('boolean', { default: true })
  activo: boolean;

  @OneToOne(() => Usuario, (usuario) => usuario.personal)
  usuario: Usuario; // Cambiado de usuarios[] a usuario

  @OneToMany(() => Trabajo, (trabajo) => trabajo.personal)
  trabajos: Trabajo[];
}
