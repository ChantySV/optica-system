import { DetalleTrabajo } from 'src/mtrabajos/trabajos/entities/detalle-trabajo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity('colores')
export class Color {
  @PrimaryGeneratedColumn('uuid')
  id_color: string;

  @Column('varchar', { unique: true })
  nombre: string;

  @Column({ default: true })
  activo: boolean;

  @OneToOne(() => DetalleTrabajo, (detalleTrabajo) => detalleTrabajo.color)  
  detalleTrabajo: DetalleTrabajo;

  @BeforeInsert()
  @BeforeUpdate()
  formatName() {
    this.nombre = this.nombre.trim().replace(/\s+/g, ' ').toLocaleLowerCase();
    this.nombre = this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1);
  }
}