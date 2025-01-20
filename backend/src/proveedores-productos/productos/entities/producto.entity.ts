import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { DetalleTrabajo } from 'src/mtrabajos/trabajos/entities/detalle-trabajo.entity';
import { ProductoProveedor } from './produto-proveedor.entity';


@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id_producto: string;

  @Column('varchar')
  nombre: string;

  @Column('int')
  stock: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precio_compra: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precio_venta: number;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => ProductoProveedor, (productoProveedor) => productoProveedor.producto)
  productosProveedores: ProductoProveedor[];

  @OneToOne(() => DetalleTrabajo, (detalleTrabajo) => detalleTrabajo.producto) 
  detalleTrabajos: DetalleTrabajo;
}