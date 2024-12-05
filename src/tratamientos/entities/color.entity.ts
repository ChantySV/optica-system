// colores/entities/color.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('colores')
export class Color {
  @PrimaryGeneratedColumn('uuid')
  id_color: string;

  @Column()
  nombre: string;

  @Column()
  activo: boolean;
}
