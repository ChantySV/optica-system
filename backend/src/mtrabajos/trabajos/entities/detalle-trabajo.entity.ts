import { Tratamiento } from 'src/mtrabajos/tratamientos/entities/tratamiento.entity';
import { Producto } from 'src/proveedores-productos/productos/entities/producto.entity';
import { Color } from 'src/mtrabajos/colores/entities/colore.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity('detalleTrabajos')
export class DetalleTrabajo {
  @PrimaryGeneratedColumn('uuid')
  id_detalleTrabajo: string;

  @Column()
  distancia: boolean;

  @Column({ type: 'int', nullable: true })
  base?: number;

  @Column({ type: 'int', nullable: true })
  adicion?: number;

  @Column('decimal', { nullable: true })
  esferico_derecho?: number;

  @Column('decimal', { nullable: true })
  esferico_izquierdo?: number;

  @Column('decimal', { nullable: true })
  cilindro_derecho?: number;

  @Column('decimal', { nullable: true })
  cilindro_izquierdo?: number;

  @Column({ type: 'int', nullable: true })
  eje_derecho?: number;

  @Column({ type: 'int', nullable: true })
  eje_izquierdo?: number;

  @ManyToOne(() => Tratamiento, (tratamiento) => tratamiento.detalleTrabajos, { nullable: true })
  @JoinColumn({ name: 'id_tratamiento' })
  tratamiento?: Tratamiento | null;

  @ManyToOne(() => Color, (color) => color.detalleTrabajo, { nullable: true })
  @JoinColumn({ name: 'id_color' })
  color?: Color | null;

  @ManyToOne(() => Producto, (producto) => producto.detalleTrabajos, { nullable: false })
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;
}
