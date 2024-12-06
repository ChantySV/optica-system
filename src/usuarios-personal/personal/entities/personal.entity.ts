import { Entity, PrimaryColumn, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from 'src/usuarios-personal/usuarios/entities/usuario.entity';
import { Trabajo } from 'src/mtrabajos/trabajos/entities/trabajo.entity';

@Entity('personal')
export class Personal {
  @PrimaryGeneratedColumn('uuid')
  id_personal: string;

  @Column()
  nombres: string;

  @Column()
  apellido_paterno: string;

  @Column()
  apellido_materno: string;

  @Column()
  email: string;

  @Column()
  telefono: number;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => Usuario, (usuario) => usuario.personal)
  usuarios: Usuario[];

  @OneToMany(() => Trabajo, (trabajo) => trabajo.personal)
  trabajos: Trabajo[];
}
