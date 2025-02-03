import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Auth } from '../usuarios/decorators/get-usuario.decorator';
import { ValidRoles } from '../usuarios/interfaces/valid-roles.interface';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Auth(ValidRoles.admin)
  findAll() {
    return this.rolesService.findAll();
  }

  // @Get(':id')
  // @Auth(ValidRoles.admin)
  // findOne(@Param('id') id: string) {
  //   return this.rolesService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
  //   return this.rolesService.update(id, updateRoleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.rolesService.remove(id);
  // }
}
