import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { Personal } from 'src/personal/entities/personal.entity';
import { DetalleTrabajo } from 'src/mtrabajos/trabajos/entities/detalle-trabajo.entity';
import { DetalleVenta } from 'src/ventas/entities/detalle-venta.entity';


@Entity('trabajos')
export class Trabajo {
  @PrimaryGeneratedColumn('uuid')
  id_trabajo: string;

  @ManyToOne(() => DetalleTrabajo, (detalleTrabajo) => detalleTrabajo.id_detalleTrabajo, { nullable: false })
  detalleTrabajo: DetalleTrabajo;

  @Column('int', { nullable: false, unique: true })
  numero_trabajo: number;

  @Column('date', { default: () => 'CURRENT_DATE' })
  fecha_entrada: Date;

  @Column('date', { nullable: true })
  fecha_salida: Date;
  
  @ManyToOne(() => Personal, (personal) => personal.trabajos, { nullable: false })
  @JoinColumn({ name: 'id_personal' })
  personal: Personal;

  @Column({ default: true })
  activo: boolean;

  @Column({ default: 'pendiente' })
  estado: string;

  @OneToOne(() => DetalleVenta, (detalleVenta) => detalleVenta.trabajo)
  detalleVenta: DetalleVenta;
}