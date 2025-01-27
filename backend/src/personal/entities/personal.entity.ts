import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Usuario } from 'src/auth/usuarios/entities/usuario.entity';
import { Trabajo } from 'src/mtrabajos/trabajos/entities/trabajo.entity';
import { Venta } from 'src/ventas/entities/venta.entity';

@Entity('personal')
export class Personal {
  @PrimaryGeneratedColumn('uuid')
  id_personal: string;

  @Column('varchar', {nullable:false})
  nombres: string;

  @Column('varchar')
  apellido_paterno: string;

  @Column('varchar', { nullable: true })
  apellido_materno?: string | null;

  @Column('varchar', { nullable: true, unique: true })
  email?: string | null;

  @Column('int', { nullable: false })
  telefono: number | null;

  @Column('varchar', { nullable: false })
  tipo_persona: string;

  @Column('boolean', { default: true })
  activo: boolean;

  @OneToOne(() => Usuario, (usuario) => usuario.personal)
  usuario: Usuario

  @OneToMany(() => Venta, (venta) => venta.personal)
  venta: Venta[];

  @OneToMany(() => Trabajo, (trabajo) => trabajo.personal)
  trabajos: Trabajo[];
}
