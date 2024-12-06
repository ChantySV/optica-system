import { Usuario } from 'src/usuarios-personal/usuarios/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn('uuid')
  id_log: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.logs, { nullable: false })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column('varchar',{ nullable: true })
  accion: string;

  @Column('timestamp', { default: ( () => 'CURRENT_TIMESTAMP' )})
  fecha_hora: Date;

  @Column('varchar')
  ip_origen: string;
}
