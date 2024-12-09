import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DetalleTrabajo } from 'src/mtrabajos/detalle-trabajos/entities/detalle-trabajo.entity';
import { ProductoProveedor } from './produto-proveedor.entity';


@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id_producto: string;

  @Column( 'varchar' )
  nombre: string;

  @Column( 'int' )
  stock: number;

  @Column( 'decimal' )
  precio_compra: number;

  @Column( 'decimal' )
  precio_venta: number;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => ProductoProveedor, (productoProveedor) => productoProveedor.producto)
  productosProveedores: ProductoProveedor;

  @OneToMany(() => DetalleTrabajo, (detalleTrabajo) => detalleTrabajo.producto)
  detalleTrabajos: DetalleTrabajo;
}
