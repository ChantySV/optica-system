import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';

export enum ConceptoEnum {
    COMPRA = 'compra',
    VENTA = 'venta',
  }

@Entity('pmp')
export class Pmp {
  @PrimaryGeneratedColumn('uuid')
  id_pmp: string;

  @Column('date', { default: () => 'CURRENT_DATE' })
  fecha: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  precio: number;

  @Column({ type: 'enum', enum: ConceptoEnum, default: ConceptoEnum.COMPRA })
  concepto: ConceptoEnum;

  @Column({ type: 'int' })
  cantidad: number;

  @ManyToOne(() => Producto, (producto) => producto.pmp, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;
}
