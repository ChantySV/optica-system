import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto, UpdateUsuarioDto, LoginUsuarioDto } from './dto/index';
import { Auth } from './decorators/get-usuario.decorator';
import { ValidRoles } from './interfaces/valid-roles.interface';


@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @Auth( ValidRoles.admin )
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Post('sign-up')
  login(@Body() loginUsuarioDto: LoginUsuarioDto) {
    return this.usuariosService.login(loginUsuarioDto);
  }

  @Get()
  @Auth( ValidRoles.admin )
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  @Auth( ValidRoles.admin )
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id')
  @Auth( ValidRoles.admin )
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  @Auth( ValidRoles.admin )
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  } 
}
