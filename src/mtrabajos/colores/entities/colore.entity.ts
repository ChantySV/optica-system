import { DetalleTrabajo } from 'src/mtrabajos/detalle-trabajos/entities/detalle-trabajo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, Unique, BeforeUpdate } from 'typeorm';


@Entity('colores')
export class Color {
  @PrimaryGeneratedColumn('uuid')
  id_color: string;

  @Column('varchar', { unique: true })  
  nombre: string;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => DetalleTrabajo, (detalleTrabajo) => detalleTrabajo.color)
  detalleTrabajos: DetalleTrabajo[];

  @BeforeInsert()
  @BeforeUpdate()
  mayuscula() {
    this.nombre = this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1).toLocaleLowerCase()    
    this.nombre = this.nombre.replaceAll(' ', '').replaceAll("'", '')
  }  
}
