import { Injectable } from '@nestjs/common';
import { CreateOpticaDto } from './dto/create-optica.dto';
import { UpdateOpticaDto } from './dto/update-optica.dto';

@Injectable()
export class OpticasService {
  create(createOpticaDto: CreateOpticaDto) {
    return 'This action adds a new optica';
  }

  findAll() {
    return `This action returns all opticas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} optica`;
  }

  update(id: number, updateOpticaDto: UpdateOpticaDto) {
    return `This action updates a #${id} optica`;
  }

  remove(id: number) {
    return `This action removes a #${id} optica`;
  }
}
