import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Venta } from 'src/ventas/entities/venta.entity';
import { Trabajo } from 'src/mtrabajos/trabajos/entities/trabajo.entity';

@Entity('detalleVentas')
export class DetalleVenta {
  @PrimaryGeneratedColumn('uuid')
  id_detalleVenta: string;

  @ManyToOne(() => Venta, (venta) => venta.detalleVentas, { nullable: false })
  @JoinColumn({ name: 'id_venta' })
  venta: Venta;

  @OneToOne(() => Trabajo, { nullable: false })
  @JoinColumn({ name: 'id_trabajo' })
  trabajo: Trabajo;

}
