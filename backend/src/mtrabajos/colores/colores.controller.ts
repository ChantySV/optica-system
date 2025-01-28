import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Res, Query } from '@nestjs/common';
import { ColoresService } from './colores.service';
import { CreateColoreDto } from './dto/create-colore.dto';
import { UpdateColoreDto } from './dto/update-colore.dto';
import { Auth } from 'src/auth/usuarios/decorators/get-usuario.decorator';
import { ValidRoles } from 'src/auth/usuarios/interfaces/valid-roles.interface';

@Controller('colores')
export class ColoresController {
  constructor(private readonly coloresService: ColoresService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createColoreDto: CreateColoreDto) {
    return this.coloresService.create(createColoreDto);
  }

  @Get()
  @Auth(ValidRoles.admin)
  findAll(
    @Query() query,    
  ) {
    return this.coloresService.findAll(query);
  }

  @Get('nombres')
  @Auth(ValidRoles.admin)
  findColor() {
    return this.coloresService.findColor();
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateColoreDto: UpdateColoreDto) {
    return this.coloresService.update(id, updateColoreDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.coloresService.remove(id);
  }
}
