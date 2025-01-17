import { Tratamiento } from 'src/mtrabajos/tratamientos/entities/tratamiento.entity';
import { Producto } from 'src/proveedores-productos/productos/entities/producto.entity';
import { Color } from 'src/mtrabajos/colores/entities/colore.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity('detalleTrabajos')
export class DetalleTrabajo {
  @PrimaryGeneratedColumn('uuid')
  id_detalleTrabajo: string;

  @Column()
  distancia: boolean;

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

  @Column({ type: 'int', nullable: true })
  prisma_izquierdo?: number;

  @Column({ type: 'int', nullable: true })
  prisma_derecho?: number;

  @Column({ type: 'int', nullable: true })
  base_izquierdo?: number;

  @Column({ type: 'int', nullable: true })
  base_derecho?: number;

  @Column({ type: 'int', nullable: true })
  adicion_izquierdo?: number;

  @Column({ type: 'int', nullable: true })
  adicion_derecho?: number;

  @Column({ type: 'int', nullable: true })
  altura_izquierdo?: number;

  @Column({ type: 'int', nullable: true })
  altura_derecho?: number;

  @Column({ type: 'decimal', nullable: true })
  dip_izquierdo?: number;

  @Column({ type: 'int', nullable: true })
  dip_derecho?: number;

  @OneToOne(() => Tratamiento, (tratamiento) => tratamiento.detalleTrabajo, { nullable: true })
  @JoinColumn({ name: 'id_tratamiento' })
  tratamiento?: Tratamiento;

  @OneToOne(() => Color, (color) => color.detalleTrabajo, { nullable: true })
  @JoinColumn({ name: 'id_color' })
  color?: Color;

  @OneToOne(() => Producto, (producto) => producto.detalleTrabajo)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto; 
}
