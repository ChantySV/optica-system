import { Venta } from 'src/mventas/ventas/entities/venta.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('opticas')
export class Optica {
  @PrimaryGeneratedColumn('uuid')
  id_optica: string;

  @Column( 'varchar' )
  nombre: string;

  @Column( 'varchar', { nullable: true } )
  direccion: string;

  @Column( 'varchar', { nullable: true } )
  numero: string;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => Venta, (venta) => venta.optica)
  ventas: Venta[];
}
