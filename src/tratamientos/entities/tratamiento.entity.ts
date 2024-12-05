// tratamientos/entities/tratamiento.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tratamientos')
export class Tratamiento {
  @PrimaryGeneratedColumn('uuid')
  id_tratamiento: string;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  activo: boolean;
}
