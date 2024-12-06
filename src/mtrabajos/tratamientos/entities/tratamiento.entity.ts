import { DetalleTrabajo } from 'src/mtrabajos/detalle-trabajos/entities/detalle-trabajo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('tratamientos')
export class Tratamiento {
  @PrimaryGeneratedColumn('uuid')
  id_tratamiento: string;

  @Column( 'varchar' )
  nombre: string;

  @Column( 'varchar', { nullable: true } )
  descripcion: string;

  @Column( 'boolean', { default: true } )
  activo: boolean;

  @OneToMany(() => DetalleTrabajo, (detalleTrabajo) => detalleTrabajo.tratamiento)
  detalleTrabajos: DetalleTrabajo[];
}
