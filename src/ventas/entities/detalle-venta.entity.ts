// ventas/entities/detalle-venta.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Venta } from './venta.entity';
import { Trabajo } from '../../trabajos/entities/trabajo.entity';

@Entity('detalleVentas')
export class DetalleVenta {
  @PrimaryGeneratedColumn('uuid')
  id_detalleVenta: string;

  @ManyToOne(() => Venta, (venta) => venta.detalleVentas)
  @JoinColumn({ name: 'id_venta' })
  venta: Venta;

  @ManyToOne(() => Trabajo)
  @JoinColumn({ name: 'id_trabajo' })
  trabajo: Trabajo;

  @Column()
  cantidad: number;

  @Column('decimal')
  precio_unitario: number;

  @Column('decimal')
  total_parcial: number;
}
