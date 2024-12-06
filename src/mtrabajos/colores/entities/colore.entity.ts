import { DetalleTrabajo } from 'src/mtrabajos/detalle-trabajos/entities/detalle-trabajo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity('colores')
export class Color {
  @PrimaryGeneratedColumn('uuid')
  id_color: string;

  @Column()
  nombre: string;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => DetalleTrabajo, (detalleTrabajo) => detalleTrabajo.color)
  detalleTrabajos: DetalleTrabajo[];
}
