import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    private readonly errorHandleService: ErrorHandleService,
  ) { }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      const role = this.roleRepository.create(createRoleDto);
      return await this.roleRepository.save(role);
    } catch (error) {

      this.errorHandleService.errorHandle(error);
    }
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find({
      where: { activo: true }      
    });
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id_rol: id, activo: true },
      relations: ['rolePermisos', 'rolePermisos.permiso'],
    });

    if (!role) {
      throw new NotFoundException(`Rol con ID "${id}" no encontrado`);
    }

    return role;
  }

  // async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
  //   try {
  //     const { nombre_rol, activo, permisos } = updateRoleDto;

  //     const role = await this.roleRepository.preload({
  //       id_rol: id,
  //       ...updateRoleDto, // Aquí se puede usar directamente
  //     });

  //     if (!role) {
  //       throw new NotFoundException(`Rol con ID "${id}" no encontrado`);
  //     }

  //     const updatedRole = await this.roleRepository.save(role);

  //     if (permisos) {
  //       await this.rolePermisoRepository.delete({ role: { id_rol: id } });

  //       const newRolePermisos = permisos.map((permisoId) =>
  //         this.rolePermisoRepository.create({
  //           role: { id_rol: id },
  //           permiso: { id_permiso: permisoId },
  //         })
  //       );

  //       await this.rolePermisoRepository.save(newRolePermisos);
  //     }

  //     return updatedRole;
  //   } catch (error) {
  //     this.errorHandleService.errorHandle(error);
  //   }
  // }

  async remove(id: string): Promise<Role> {
    try {
      const role = await this.findOne(id);
      role.activo = false;
      return await this.roleRepository.save(role);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }
}
