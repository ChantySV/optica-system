// productos/entities/producto.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Proveedor } from 'src/proveedores/entities/proveedore.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id_producto: string;

  @Column()
  nombre: string;

  @Column()
  stock: number;

  @Column('decimal')
  precio_compra: number;

  @Column('decimal')
  precio_venta: number;

  @Column()
  activo: boolean;

  @ManyToMany(() => Proveedor, (proveedor) => proveedor.productos)
  @JoinTable({
    name: 'productosProveeedores',
    joinColumn: { name: 'id_producto', referencedColumnName: 'id_producto' },
    inverseJoinColumn: { name: 'id_proveedor', referencedColumnName: 'id_proveedor' },
  })
  proveedores: Proveedor[];
}
