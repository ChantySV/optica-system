import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Query } from '@nestjs/common';
import { PmpService } from './pmp.service';
import { CreatePmpDto } from './dto/create-pmp.dto';
import { Auth } from 'src/auth/usuarios/decorators/get-usuario.decorator';
import { ValidRoles } from 'src/auth/usuarios/interfaces/valid-roles.interface';

@Controller('pmp')
export class PmpController {
  constructor(private readonly pmpService: PmpService) {}

@Post()
  async createPmp(@Body() createPmpDto: CreatePmpDto) {
    return await this.pmpService.createPmp(
      createPmpDto.id_producto,
      createPmpDto.cantidad,      
      createPmpDto.concepto
    );
  }
  
  @Get('compra')
  @Auth(ValidRoles.admin)
  async getPmpCompraData(
    @Query('search') search: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    return await  this.pmpService.getPmpCompraData(search, pageNumber, limitNumber);
  }
  
  @Get('venta')
  @Auth(ValidRoles.admin)
  async getPmpVentaData(
    @Query('search') search: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    return await  this.pmpService.getPmpVentaData(search, pageNumber, limitNumber);;
  }

  @Get('neto')
  @Auth(ValidRoles.admin)
  async getPmpNetoData(
    @Query('search') search: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    return await  this.pmpService.getPmpNetoData(search, pageNumber, limitNumber);;
  }
  
}
