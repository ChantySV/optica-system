import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Role } from 'src/roles-permisos/roles/entities';
import { Personal } from 'src/usuarios-personal/personal/entities/personal.entity';
import { Log } from 'src/usuarios-personal/log/entities/log.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id_usuario: string;

  @Column({ unique: true })
  nombre_usuario: string;

  @Column()
  contraseña: string;

  @Column({ default: true })
  activo: boolean;

  @ManyToOne(() => Role, (role) => role.usuarios)
  @JoinColumn({ name: 'id_rol' })
  role: Role;

  @ManyToOne(() => Personal, (personal) => personal.usuarios)
  @JoinColumn({ name: 'id_personal' })
  personal: Personal;

  @OneToMany(() => Log, (log) => log.usuario)
  logs: Log[];
}
