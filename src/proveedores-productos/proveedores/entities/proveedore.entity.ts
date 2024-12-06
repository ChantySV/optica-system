import { ProductoProveedor } from 'src/proveedores-productos/productos/entities/produto-proveedor.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('proveedores')
export class Proveedor {
  @PrimaryGeneratedColumn()
  id_proveedor: number;

  @Column()
  nombre: string;

  @Column()
  numero: string;

  @Column()
  empresa: string;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => ProductoProveedor, (productoProveedor) => productoProveedor.proveedor)
  productosProveedores: ProductoProveedor[];
}
