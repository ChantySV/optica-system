// trabajos/entities/detalle-trabajo.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
  } from 'typeorm';
  import { Tratamiento } from '../../tratamientos/entities/tratamiento.entity';
  import { Producto } from '../../productos/entities/producto.entity';
  import { Color } from '../../tratamientos/entities/color.entity';
  import { Trabajo } from './trabajo.entity';
  
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
  
    @ManyToOne(() => Tratamiento)
    @JoinColumn({ name: 'id_tratamiento' })
    tratamiento: Tratamiento;
  
    @ManyToOne(() => Producto)
    @JoinColumn({ name: 'id_producto' })
    producto: Producto;
  
    @ManyToOne(() => Color)
    @JoinColumn({ name: 'id_color' })
    color: Color;
  
    @OneToMany(() => Trabajo, (trabajo) => trabajo.detalleTrabajo)
    trabajos: Trabajo[];
  }
  