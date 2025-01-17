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

  @Column('varchar', { nullable:false })
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
