import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';

export enum ConceptoEnum {
  COMPRA = 'compra',
  VENTA = 'venta',
}

@Entity('pmp')
export class Pmp {
  @PrimaryGeneratedColumn('uuid')
  id_pmp: string;

  @Column('date', { nullable: false })
  fecha: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_unitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor_total: number;

  @Column({ type: 'enum', enum: ConceptoEnum, default: ConceptoEnum.COMPRA })
  concepto: ConceptoEnum;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  pmp_resultante: number;

  @ManyToOne(() => Producto, (producto) => producto.pmp, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  @BeforeInsert()
  setDefaultFechaVenta() {
    if (!this.fecha) {
      this.fecha = new Date();
    }
  }
}
