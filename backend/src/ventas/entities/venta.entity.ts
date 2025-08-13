import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, BeforeInsert, } from 'typeorm';
import { DetalleVenta } from 'src/ventas/entities/detalle-venta.entity';
import { Personal } from 'src/personal/entities/personal.entity';
import { Usuario } from 'src/auth/usuarios/entities/usuario.entity';

@Entity('ventas')
export class Venta {
  @PrimaryGeneratedColumn('uuid')
  id_venta: string;

  @Column('decimal', { precision: 10, scale: 2 })
  monto_total: number;

  @Column('date', { nullable: false })
  fecha_venta: Date;

  @ManyToOne(() => Personal, (personal) => personal.venta, { nullable: true })
  @JoinColumn({ name: 'id_personal' })
  personal: Personal;  

  @Column({ default: true })
  activo: boolean;

  @ManyToOne(() => Usuario, (usuario) => usuario.venta, { nullable: false })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @OneToMany(() => DetalleVenta, (detalleVenta) => detalleVenta.venta)
  detalleVentas: DetalleVenta[];

  @BeforeInsert()
  setDefaultFechaVenta() {
    if (!this.fecha_venta) {
      this.fecha_venta = new Date(); 
    }
  }
}
