// trabajos/entities/trabajo.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DetalleTrabajo } from './index';
import { Personal } from '../../personal/entities/personal.entity';

@Entity('trabajos')
export class Trabajo {
  @PrimaryGeneratedColumn('uuid')
  id_trabajo: string;

  @ManyToOne(() => DetalleTrabajo, (detalle) => detalle.trabajos)
  @JoinColumn({ name: 'id_detalleTrabajo' })
  detalleTrabajo: DetalleTrabajo;

  @Column('date')
  fecha_entrada: Date;

  @Column('date')
  fecha_salida: Date;

  @Column('decimal')
  costo: number;

  @ManyToOne(() => Personal, (personal) => personal.id_personal)
  @JoinColumn({ name: 'id_personal' })
  personal: Personal;

  @Column()
  activo: boolean;
}
