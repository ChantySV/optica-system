import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateColoreDto } from './dto/create-colore.dto';
import { UpdateColoreDto } from './dto/update-colore.dto';
import { Color } from './entities/colore.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';

@Injectable()
export class ColoresService {
  constructor(

    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,

    private readonly ErrorHandleService: ErrorHandleService

  ) {

  }
  async create(createColoreDto: CreateColoreDto) {
    try {

      const color = this.colorRepository.create(createColoreDto);
      await this.colorRepository.save(color)
      return color;

    } catch (error) {
      this.ErrorHandleService.errorHandle(error)
    }
  }

  async findAll() {
    return this.colorRepository.find({ where: { activo: true } });
  }

  async update(id: string, updateColoreDto: UpdateColoreDto) {
    try {
      const color = await this.colorRepository.preload({
        id_color: id,
        ...updateColoreDto
      })

      if (!color) throw new NotFoundException(`Color ${updateColoreDto.nombre} no encontrado`);
      return this.colorRepository.save(color);

    } catch (error) {
      this.ErrorHandleService.errorHandle(error)
    }
  }

  async remove(id: string,) {
    try {
      const color = await this.colorRepository.findOneBy({ id_color: id })
      if (!color) throw new NotFoundException(`Color con ID ${id} no encontrado`);
      color.activo = false
      this.colorRepository.save(color);

    } catch (error) {
      this.ErrorHandleService.errorHandle(error)
    }
  }
}
