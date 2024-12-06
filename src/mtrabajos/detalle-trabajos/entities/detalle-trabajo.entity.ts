import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Color } from 'src/mtrabajos/colores/entities/colore.entity';
import { Producto } from 'src/proveedores-productos/productos/entities/producto.entity';
import { Tratamiento } from 'src/mtrabajos/tratamientos/entities/tratamiento.entity';

@Entity('detalleTrabajos')
export class DetalleTrabajo {
  @PrimaryGeneratedColumn('uuid')
  id_detalleTrabajo: string;

  @Column()
  distancia: boolean;

  @Column('decimal')
  esferico_derecho: number;

  @Column('decimal')
  esferico_izquierdo: number;

  @Column('decimal')
  cilindro_derecho: number;

  @Column('decimal')
  cilindro_izquierdo: number;

  @Column()
  eje_derecho: number;

  @Column()
  eje_izquierdo: number;

  @ManyToOne(() => Tratamiento, (tratamiento) => tratamiento.detalleTrabajos)
  @JoinColumn({ name: 'id_tratamiento' })
  tratamiento: Tratamiento;

  @ManyToOne(() => Producto, (producto) => producto.detalleTrabajos)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  @ManyToOne(() => Color, (color) => color.detalleTrabajos)
  @JoinColumn({ name: 'id_color' })
  color: Color;
}
