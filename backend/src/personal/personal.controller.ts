import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { Auth } from 'src/auth/usuarios/decorators/get-usuario.decorator';
import { ValidRoles } from 'src/auth/usuarios/interfaces/valid-roles.interface';
import { PaginationDto } from 'src/common/pagination-dto';
import { QueryPersonalDto } from './dto/query-response-personal.dto';
import { QueryGetDto } from 'src/common/QueryGet-dto';

@Controller('personal')

export class PersonalController {
  constructor(private readonly personalService: PersonalService) {}

  @Post()  
  @Auth(ValidRoles.admin)
  create(@Body() createPersonalDto: CreatePersonalDto) {
    return this.personalService.create(createPersonalDto);
  }

  
  @Get('juridicos')
  @Auth(ValidRoles.admin)
  findAllJuridicos( 
    @Query() paginationDto: PaginationDto,
    @Query() queryGetDto: QueryGetDto,
    @Query() queryPersonalDto: QueryPersonalDto
  ) {
    return this.personalService.findAllJuridicos( paginationDto, queryGetDto, queryPersonalDto);
  }

  @Get('naturales')
  @Auth(ValidRoles.encargadoVentas)
  findAllNaturales( 
    @Query() paginationDto: PaginationDto,
    @Query() queryGetDto: QueryGetDto,
    @Query() queryPersonalDto: QueryPersonalDto
  ) {
    return this.personalService.findAllNaturales( paginationDto, queryGetDto, queryPersonalDto );
  }

  @Get('search-admin')
  @Auth(ValidRoles.admin)
  async searchAdmin(@Query('search') search: string) {
    return await this.personalService.searchPersonaAdmin(search);
  }

  @Get('search')
  @Auth(ValidRoles.encargadoVentas)
  async search(@Query('search') search: string) {
    return await this.personalService.searchPersonaVenta(search);
  }

  @Get()
  @Auth(ValidRoles.admin)
  findAll( @Query() paginationDto :PaginationDto) {
    return this.personalService.findAll( paginationDto );
  }

  @Get('nombres')
  @Auth(ValidRoles.encargadoTrabajos)
  findPersonal() {
    return this.personalService.findPersonal();
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  findOne(@Param('id') id: string) {
    return this.personalService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(@Param('id') id: string, @Body() updatePersonalDto: UpdatePersonalDto) {
    return this.personalService.update(id, updatePersonalDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id') id: string) {
    return this.personalService.remove(id);
  }
}
