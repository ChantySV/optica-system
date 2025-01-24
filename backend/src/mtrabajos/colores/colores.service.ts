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

    private readonly errorHandleService: ErrorHandleService,
  ) {}

  // Crear un nuevo color
  async create(createColoreDto: CreateColoreDto): Promise<Color> {
    try {
      const color = this.colorRepository.create(createColoreDto);
      return await this.colorRepository.save(color);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Obtener todos los colores
  async findAll(){
    try {
      return await this.colorRepository.find();
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }
  
  // Obtener todos los colores activos
  async findColor(){
    try {
      return await this.colorRepository.find({ where: { activo: true }, select:['id_color', 'nombre'] });
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Actualizar un color existente
  async update(id: string, updateColoreDto: UpdateColoreDto): Promise<Color> {
    try {
      const color = await this.colorRepository.preload({
        id_color: id,
        ...updateColoreDto,
      });

      if (!color) {
        throw new NotFoundException(`Color con ID "${id}" no encontrado`);
      }

      return await this.colorRepository.save(color);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Desactivar un color (eliminación lógica)
  async remove(id: string): Promise<Color> {
    try {
      const color = await this.colorRepository.findOneOrFail({
        where: { id_color: id, activo: true },
      });

      color.activo = false;
      return await this.colorRepository.save(color);
    } catch (error) {
      if (error.name === 'EntityNotFound') {
        throw new NotFoundException(`Color con ID "${id}" no encontrado`);
      }
      this.errorHandleService.errorHandle(error);
    }
  }
}
