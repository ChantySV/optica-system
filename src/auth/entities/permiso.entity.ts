// auth/entities/permiso.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
  } from 'typeorm';
  import { Rol } from './rol.entity';
  
  @Entity('permisos')
  export class Permiso {
    @PrimaryGeneratedColumn('uuid')
    id_permiso: string;
  
    @Column({ unique: true })
    nombre_opcion: string;
  
    @Column({ unique: true })
    ruta_opcion: string;
  
    @ManyToMany(() => Rol, (rol) => rol.permisos)
    roles: Rol[];
  }
  