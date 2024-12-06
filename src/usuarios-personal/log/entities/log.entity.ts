import { Usuario } from 'src/usuarios-personal/usuarios/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn('uuid')
  id_log: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.logs)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column()
  accion: string;

  @Column()
  fecha_hora: Date;

  @Column()
  ip_origen: string;
}
