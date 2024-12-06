import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Producto } from './producto.entity';
import { Proveedor } from 'src/proveedores-productos/proveedores/entities/proveedore.entity';

@Entity('productosProveeedores')
export class ProductoProveedor {
  @PrimaryGeneratedColumn('uuid')
  id_productoProveedor: string;

  @ManyToOne(() => Producto, (producto) => producto.productosProveedores)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.productosProveedores)
  @JoinColumn({ name: 'id_proveedor' })
  proveedor: Proveedor;
}
