import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from 'src/auth/usuarios/entities/usuario.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id_rol: string;

  @Column( 'varchar', { unique: true } )
  nombre_rol: string;

  @Column( 'boolean', { default: true })
  activo: boolean;

  @OneToMany(() => Usuario, (usuario) => usuario.role)
  usuarios: Usuario[];
}
