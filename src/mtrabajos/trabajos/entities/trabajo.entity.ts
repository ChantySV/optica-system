import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Personal } from 'src/usuarios-personal/personal/entities/personal.entity';
import { DetalleTrabajo } from 'src/mtrabajos/detalle-trabajos/entities/detalle-trabajo.entity';


@Entity('trabajos')
export class Trabajo {
  @PrimaryGeneratedColumn('uuid')
  id_trabajo: string;

  @OneToOne(() => DetalleTrabajo, (detalleTrabajo) => detalleTrabajo.id_detalleTrabajo, { nullable: false })
  @JoinColumn({ name: 'id_detalleTrabajo' })
  detalleTrabajo: DetalleTrabajo;

  @Column('date', { default: ( () => 'CURRENT_DATE' )} )
  fecha_entrada: Date;

  @Column('date')
  fecha_salida: Date;

  @Column('decimal')
  costo: number;

  @OneToOne(() => Personal, (personal) => personal.trabajos, { nullable: false })
  @JoinColumn({ name: 'id_personal' })
  personal: Personal;

  @Column({ default: true, nullable:true })
  activo: boolean;
}
