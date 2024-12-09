import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Role } from 'src/roles-permisos/roles/entities';
import { Personal } from 'src/usuarios-personal/personal/entities/personal.entity';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(Personal)
    private readonly personalRepository: Repository<Personal>,

    private readonly errorHandleService: ErrorHandleService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    try {
      const { id_rol, id_personal, ...usuarioData } = createUsuarioDto;

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
        throw new NotFoundException(
          `Personal con ID "${id_personal}" no encontrado`,
        );
      }

      const usuario = this.usuarioRepository.create({
        ...usuarioData,
        role,
        personal,
      });

      return await this.usuarioRepository.save(usuario);
    } catch (error) {
      this.errorHandleService.errorHandle(error); 
    }
  }

  async findAll(): Promise<Usuario[]> {
    try {
      return await this.usuarioRepository.find({
        where: { activo: true },
        relations: ['role', 'personal', 'logs'],
      });
    } catch (error) {
      this.errorHandleService.errorHandle(error); 
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

  async update(
    id: string,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    try {
      const { id_rol, id_personal, ...usuarioData } = updateUsuarioDto;

      const usuario = await this.usuarioRepository.findOne({
        where: { id_usuario: id, activo: true },
        relations: ['role', 'personal'],
      });

      if (!usuario) {
        throw new NotFoundException(`Usuario con ID "${id}" no encontrado`);
      }

      if (id_rol) {
        const role = await this.roleRepository.findOne({
          where: { id_rol, activo: true },
        });
        if (!role) {
          throw new NotFoundException(`Rol con ID "${id_rol}" no encontrado`);
        }
        usuario.role = role;
      }

      if (id_personal) {
        const personal = await this.personalRepository.findOne({
          where: { id_personal, activo: true },
        });
        if (!personal) {
          throw new NotFoundException(
            `Personal con ID "${id_personal}" no encontrado`,
          );
        }
        usuario.personal = personal;
      }

      Object.assign(usuario, usuarioData);

      return await this.usuarioRepository.save(usuario);
    } catch (error) {
      this.errorHandleService.errorHandle(error); 
    }
  }

  async remove(id: string): Promise<Usuario> {
    try {
      const usuario = await this.findOne(id);
      usuario.activo = false; 
      return await this.usuarioRepository.save(usuario);
    } catch (error) {
      this.errorHandleService.errorHandle(error); 
    }
  }
}
