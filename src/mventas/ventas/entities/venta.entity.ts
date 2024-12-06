import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Optica } from 'src/opticas/entities/optica.entity';
import { Usuario } from 'src/usuarios-personal/usuarios/entities/usuario.entity';
import { DetalleVenta } from 'src/mventas/detalle-ventas/entities/detalle-venta.entity';

@Entity('ventas')
export class Venta {
  @PrimaryGeneratedColumn('uuid')
  id_venta: string;

  @Column('decimal')
  monto_total: number;

  @Column('date')
  fecha_venta: Date;

  @ManyToOne(() => Optica, (optica) => optica.ventas)
  @JoinColumn({ name: 'id_optica' })
  optica: Optica;

  @ManyToOne(() => Usuario, (usuario) => usuario.id_usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => DetalleVenta, (detalleVenta) => detalleVenta.venta)
  detalleVentas: DetalleVenta[];
}
