import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  BadRequestException,
} from '@nestjs/common';
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
      createPmpDto.concepto,
    );
  }

  @Get('pmpData')
  @Auth(ValidRoles.admin)
  async getPmpData(
    @Query('tipo') tipo: string,     
    @Query('search') search: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    switch (tipo) {
      case 'compra':
        return await this.pmpService.getPmpData(tipo, search, pageNumber, limitNumber);
      case 'venta':
        return await this.pmpService.getPmpData(tipo, search, pageNumber, limitNumber);
      case 'neto':
        return await this.pmpService.getPmpData(tipo, search, pageNumber, limitNumber);
      default:
        throw new BadRequestException(
          "El tipo de PMP debe ser 'compra', 'venta' o 'neto'.",
        );
    }
  }
}
