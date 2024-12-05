// opticas/entities/optica.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Venta } from '../../ventas/entities/venta.entity';

@Entity('opticas')
export class Optica {
  @PrimaryGeneratedColumn('uuid')
  id_optica: string;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  numero: string;

  @Column()
  activo: boolean;

  @OneToMany(() => Venta, (venta) => venta.optica)
  ventas: Venta[];
}
