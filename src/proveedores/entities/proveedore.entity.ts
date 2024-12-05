// proveedores/entities/proveedor.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('proveedores')
export class Proveedor {
  @PrimaryGeneratedColumn('uuid')
  id_proveedor: string;

  @Column()
  nombre: string;

  @Column()
  numero: string;

  @Column()
  empresa: string;

  @Column()
  activo: boolean;

  @ManyToMany(() => Producto, (producto) => producto.proveedores)
  productos: Producto[];
}
