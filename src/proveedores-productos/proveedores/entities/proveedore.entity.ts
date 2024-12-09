import { ProductoProveedor } from 'src/proveedores-productos/productos/entities/produto-proveedor.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('proveedores')
export class Proveedor {
  @PrimaryGeneratedColumn('uuid')
  id_proveedor: string;

  @Column()
  nombre: string;

  @Column( 'varchar', { nullable: true } )
  numero: string;

  @Column( 'varchar' )
  direccion_web: string;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => ProductoProveedor, (productoProveedor) => productoProveedor.proveedor)
  productosProveedores: ProductoProveedor;
}
