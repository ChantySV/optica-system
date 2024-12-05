// auth/entities/rol.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  import { Usuario } from './usuario.entity';
  import { Permiso } from './permiso.entity'; 
  
  @Entity('roles')
  export class Rol {
    @PrimaryGeneratedColumn('uuid')
    id_rol: string;
  
    @Column({ unique: true })
    nombre_rol: string;
  
    @OneToMany(() => Usuario, (usuario) => usuario.rol)
    usuarios: Usuario[];
  
    @ManyToMany(() => Permiso)
    @JoinTable({
      name: 'rolesPermisos',
      joinColumn: { name: 'id_rol', referencedColumnName: 'id_rol' },
      inverseJoinColumn: {
        name: 'id_permiso',
        referencedColumnName: 'id_permiso',
      },
    })
    permisos: Permiso[];
  }
  