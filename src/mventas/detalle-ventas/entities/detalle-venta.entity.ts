import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { Venta } from 'src/mventas/ventas/entities/venta.entity';
import { Trabajo } from 'src/mtrabajos/trabajos/entities/trabajo.entity';

@Entity('detalleVentas')
export class DetalleVenta {
  @PrimaryGeneratedColumn('uuid')
  id_detalleVenta: string;

  @ManyToOne(() => Venta, (venta) => venta.detalleVentas, { nullable: false } )
  @JoinColumn({ name: 'id_venta' })
  venta: Venta;

  @ManyToOne(() => Trabajo, (trabajo) => trabajo.id_trabajo, { nullable: false } )
  @JoinColumn({ name: 'id_trabajo' })
  trabajo: Trabajo;

  @Column( 'int' )
  cantidad: number;

  @Column( 'decimal' )
  precio_unitario: number;

  @Column( 'decimal' )
  total_parcial: number;

  @BeforeInsert()
  calculateParcial(){
    this.total_parcial = (this.precio_unitario * this.cantidad)
  }
}
