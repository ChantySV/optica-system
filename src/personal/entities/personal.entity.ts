// auth/entities/personal.entity.ts
import { Entity, PrimaryColumn, Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from 'src/auth/entities';

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

  @OneToOne(() => Usuario, (usuario) => usuario.personal)
  usuario: Usuario;
}
