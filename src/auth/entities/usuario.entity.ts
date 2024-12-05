// auth/entities/usuario.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    OneToOne,
  } from 'typeorm';
import { Rol } from './rol.entity';
import { Log } from './log.entity';
import { Personal } from 'src/personal/entities/personal.entity';
  
  
  @Entity('usuarios')
  export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id_usuario: string;
  
    @Column({ unique: true })
    nombre_usuario: string;
  
    @Column()
    contraseña: string;
  
    @Column()
    activo: boolean;
  
    @ManyToOne(() => Rol, (rol) => rol.usuarios)
    @JoinColumn({ name: 'id_rol' })
    rol: Rol;
  
    @OneToOne(() => Personal, (personal) => personal.usuario)
    @JoinColumn({ name: 'id_personal' })
    personal: Personal;
  
    @OneToMany(() => Log, (log) => log.usuario)
    logs: Log[];
  }
  