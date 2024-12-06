import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Personal } from 'src/usuarios-personal/personal/entities/personal.entity';
import { DetalleTrabajo } from 'src/mtrabajos/detalle-trabajos/entities/detalle-trabajo.entity';


@Entity('trabajos')
export class Trabajo {
  @PrimaryGeneratedColumn('uuid')
  id_trabajo: string;

  @ManyToOne(() => DetalleTrabajo, (detalleTrabajo) => detalleTrabajo.id_detalleTrabajo)
  @JoinColumn({ name: 'id_detalleTrabajo' })
  detalleTrabajo: DetalleTrabajo;

  @Column('date')
  fecha_entrada: Date;

  @Column('date')
  fecha_salida: Date;

  @Column('decimal')
  costo: number;

  @ManyToOne(() => Personal, (personal) => personal.trabajos)
  @JoinColumn({ name: 'id_personal' })
  personal: Personal;

  @Column({ default: true })
  activo: boolean;
}
