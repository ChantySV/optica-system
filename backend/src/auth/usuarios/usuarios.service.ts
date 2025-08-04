import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository, SelectQueryBuilder } from 'typeorm';

import { Usuario } from './entities/usuario.entity';
import { Role } from '../roles/entities/role.entity';
import { Personal } from 'src/personal/entities/personal.entity';
import { CreateUsuarioDto, UpdateUsuarioDto, LoginUsuarioDto } from './dto/index';
import { JwtPayload } from './interfaces/jwt-payload.interface';

import * as bcrypt from 'bcrypt'

import { ErrorHandleService } from '../../common/services/error-handle/error-handle.service';
import { PaginationDto } from 'src/common/pagination-dto';
import { QueryGetDto } from 'src/common/QueryGet-dto';
import { queryResponseUsuarioDto } from './dto/query-response-usuario.dto';
import { FilterUsuarioDto } from './dto/filter-usuario.dto';


@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(Personal)
    private readonly personalRepository: Repository<Personal>,

    private readonly jwtService: JwtService,

    private readonly errorHandleService: ErrorHandleService,
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<{ ok: boolean; data: any; message?: string }> {
    try {
      const { id_rol, id_personal, contrasenha, ...usuarioData } = createUsuarioDto;
      
      const existingUsuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: usuarioData.nombre_usuario } });
      if (existingUsuario) {
        throw new ConflictException('El nombre de usuario ya está en uso.');
      }
      
      const role = id_rol
        ? await this.roleRepository.findOne({ where: { id_rol, activo: true } })
        : null;
      if (id_rol && !role) {
        throw new NotFoundException(`Rol con ID "${id_rol}" no encontrado`);
      }
      
      const personal = id_personal
        ? await this.personalRepository.findOne({
            where: { id_personal, activo: true },
          })
        : null;
      if (id_personal && !personal) {
        throw new NotFoundException(`Personal con ID "${id_personal}" no encontrado`);
      }

      const hashedPassword = await bcrypt.hash(contrasenha, 10);
      
      const usuario = this.usuarioRepository.create({
        ...usuarioData,
        role,
        personal,
        contrasenha: hashedPassword,
      });

      const savedUsuario = await this.usuarioRepository.save(usuario);
      
      const data = {
        nombre_usuario: savedUsuario.nombre_usuario,
        activo: savedUsuario.activo,
        role: {
          nombre_rol: savedUsuario.role.nombre_rol,
        },
        personal: {
          nombres: savedUsuario.personal.nombres,
        },
      };

      return {
        ok: true,
        data,
      };
    } catch (error) {
      this.errorHandleService.errorHandle(error);
      return {
        ok: false,
        data: null,
        message: error.message || 'Error al crear el usuario.',
      };
    }
  }

  async findAll(
    paginationDto: PaginationDto,
    queryGetDto: QueryGetDto,
    filterUsuarioDto: FilterUsuarioDto,
  ): Promise<{ ok: true; data: any[]; total: number }> {
    try {
      const { limit, offset } = paginationDto;
      const { order = 'ASC' } = queryGetDto;
      const { sortBy = 'nombre_usuario' } = queryGetDto; 
      
      const query: SelectQueryBuilder<Usuario> = this.usuarioRepository.createQueryBuilder('usuario')
        .leftJoinAndSelect('usuario.role', 'role')
        .leftJoinAndSelect('usuario.personal', 'personal');

      if (filterUsuarioDto.nombre_usuario) {
        query.andWhere('usuario.nombre_usuario ILIKE :nombre_usuario', { nombre_usuario: `%${filterUsuarioDto.nombre_usuario}%` });
      }

      if (filterUsuarioDto.nombre_rol) {
        query.andWhere('role.nombre_rol ILIKE :nombre_rol', { nombre_rol: `%${filterUsuarioDto.nombre_rol}%` });
      }

      if (filterUsuarioDto.nombres) {
        query.andWhere('personal.nombres ILIKE :nombres', { nombres: `%${filterUsuarioDto.nombres}%` });
      }
      
      if (['nombre_usuario', 'activo', 'nombre_rol', 'nombres'].includes(sortBy)) {
        if (sortBy === 'nombre_rol') {
          query.orderBy('role.nombre_rol', order);
        } else if (sortBy === 'nombres') {
          query.orderBy('personal.nombres', order);
        } else {
          query.orderBy(`usuario.${sortBy}`, order);
        }
      } else {
        throw new BadRequestException('Campo de ordenamiento inválido.');
      }

      query.take(limit).skip(offset);

      query.select([
        'usuario.id_usuario',
        'usuario.nombre_usuario',
        'usuario.activo',
        'role.id_rol',
        'role.nombre_rol',
        'personal.id_personal',
        'personal.nombres',
      ]);

      const [usuarios, total] = await query.getManyAndCount();

      const data = usuarios.map(usuario => ({
        id_usuario: usuario.id_usuario,
        nombre_usuario: usuario.nombre_usuario,
        activo: usuario.activo,
        role: {
          id_rol: usuario.role.id_rol,
          nombre_rol: usuario.role.nombre_rol,
        },
        personal: {
          id_personal: usuario.personal.id_personal,
          nombres: usuario.personal.nombres,
        },
      }));

      return { ok: true, data, total };
    } catch (error) {
      this.errorHandleService.errorHandle(error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { id_usuario: id, activo: true },
        relations: ['role', 'personal', 'logs'],
      });

      if (!usuario) {
        throw new NotFoundException(`Usuario con ID "${id}" no encontrado`);
      }

      return usuario;
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async update(id_usuario: string, updateUsuarioDto: UpdateUsuarioDto): Promise<{ ok: boolean; data: any }> {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { id_usuario },
        relations: ['role', 'personal'],
      });

      if (!usuario) {
        throw new NotFoundException(`Usuario con ID "${id_usuario}" no encontrado`);
      }

      if (updateUsuarioDto.nombre_usuario !== usuario.nombre_usuario) {
        const existingUsuario = await this.usuarioRepository.findOne({
          where: { nombre_usuario: updateUsuarioDto.nombre_usuario },
        });
        if (existingUsuario) {
          throw new ConflictException('El nombre de usuario ya está en uso.');
        }
      }

      usuario.nombre_usuario = updateUsuarioDto.nombre_usuario || usuario.nombre_usuario;
      usuario.role = updateUsuarioDto.id_rol ? { id_rol: updateUsuarioDto.id_rol } as any : usuario.role;
      usuario.personal = updateUsuarioDto.id_personal ? { id_personal: updateUsuarioDto.id_personal } as any : usuario.personal;
      usuario.contrasenha = bcrypt.hashSync( updateUsuarioDto.contrasenha, 10 )

      const updatedUsuario = await this.usuarioRepository.save(usuario);

      const data = {
        nombre_usuario: updatedUsuario.nombre_usuario,
        activo: updatedUsuario.activo,
        role: {
          nombre_rol: updatedUsuario.role.nombre_rol,
        },
        personal: {
          nombres: updatedUsuario.personal.nombres,
        },        
      };

      return { ok: true, data };
    } catch (error) {
      this.errorHandleService.errorHandle(error);
      throw error;
    }
  }

  async remove(id: string): Promise<{ok: boolean, data: any}> {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { id_usuario: id },
        relations: ['role', 'personal'],
      });

      if (!usuario) {
        throw new NotFoundException(`Usuario con ID "${id}" no encontrado`);
      }

      usuario.activo = !usuario.activo; // Alterna el estado
      const updatedUsuario = await this.usuarioRepository.save(usuario);

      // Mapea los datos para la respuesta, excluyendo el ID
      const data = {
        nombre_usuario: updatedUsuario.nombre_usuario,
        activo: updatedUsuario.activo,
        role: {
          nombre_rol: updatedUsuario.role.nombre_rol,
        },
        personal: {
          nombres: updatedUsuario.personal.nombres,
        },
      };

      return { ok: true, data };
    } catch (error) {
      this.errorHandleService.errorHandle(error);
      throw error;
    }
  }

  async login(loginUsuarioDto: LoginUsuarioDto) {

    const { nombre_usuario, contrasenha } = loginUsuarioDto;

    if (!nombre_usuario || !contrasenha) {
      throw new UnauthorizedException('Credenciales incompletas');
    }

    const user = await this.usuarioRepository.findOne({
      where: { nombre_usuario, activo: true },
      select: { nombre_usuario: true, contrasenha: true, id_usuario: true },
      relations: ['role']
    });

    if (!user || !bcrypt.compareSync(contrasenha, user.contrasenha)) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    delete user.contrasenha
    return {
      user: {...user},
      token: this.getJwtToken({ id_usuario: user.id_usuario, role: user.role.nombre_rol, }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

}
