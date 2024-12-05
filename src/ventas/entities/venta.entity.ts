// ventas/entities/venta.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Optica } from '../../opticas/entities/optica.entity';
import { Usuario } from '../../auth/entities/usuario.entity';
import { DetalleVenta } from './detalle-venta.entity';

@Entity('ventas')
export class Venta {
  @PrimaryGeneratedColumn('uuid')
  id_venta: string;

  @Column('decimal')
  monto_total: number;

  @Column('date')
  fecha_venta: Date;

  @ManyToOne(() => Optica)
  @JoinColumn({ name: 'id_optica' })
  optica: Optica;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column()
  activo: boolean;

  @OneToMany(() => DetalleVenta, (detalleVenta) => detalleVenta.venta)
  detalleVentas: DetalleVenta[];
}
