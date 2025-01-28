import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateColoreDto } from './dto/create-colore.dto';
import { UpdateColoreDto } from './dto/update-colore.dto';
import { Color } from './entities/colore.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';

@Injectable()
export class ColoresService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,

    private readonly errorHandleService: ErrorHandleService,
  ) {}

  // Crear un nuevo color
  async create(createColorDto: CreateColoreDto): Promise<{ ok: boolean; data: Color; message?: string }> {
    try {
      const existing = await this.colorRepository.findOne({ where: { nombre: createColorDto.nombre } });
      if (existing) {
        throw new ConflictException('El nombre del color ya está en uso.');
      }

      const color = this.colorRepository.create(createColorDto);
      const saved = await this.colorRepository.save(color);

      return {
        ok: true,
        data: saved,
      };
    } catch (error) {
      this.errorHandleService.errorHandle(error);
      return {
        ok: false,
        data: null,
        message: error.message || 'Error al crear el color.',
      };
    }
  }


  // Obtener todos los colores
  async findAll(query: any): Promise<{ ok: boolean; data: Color[]; total: number; message?: string }> {
    try {
      const { page = 1, limit = 10, sortBy = 'nombre', order = 'ASC', filters } = query;

      const findOptions = {
        where: {},
        order: {
          [sortBy]: order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
        },
        skip: (page - 1) * limit,
        take: limit,
      };

      if (filters && filters.nombre) {
        findOptions.where = {
          ...findOptions.where,
          nombre: Like(`%${filters.nombre}%`),
        };
      }

      const [data, total] = await this.colorRepository.findAndCount(findOptions);

      return {
        ok: true,
        data,
        total,
      };
    } catch (error) {
      this.errorHandleService.errorHandle(error);
      throw error;
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
  async update(id_color: string, updateColorDto: UpdateColoreDto): Promise<{ ok: boolean; data: Color | null; message?: string }> {
    try {
      const color = await this.colorRepository.findOne({ where: { id_color } });
      if (!color) {
        throw new NotFoundException('Color no encontrado.');
      }

      if (updateColorDto.nombre && updateColorDto.nombre !== color.nombre) {
        const existing = await this.colorRepository.findOne({ where: { nombre: updateColorDto.nombre } });
        if (existing) {
          throw new ConflictException('El nombre del color ya está en uso.');
        }
      }

      Object.assign(color, updateColorDto);
      const updated = await this.colorRepository.save(color);

      return {
        ok: true,
        data: updated,
      };
    } catch (error) {
      this.errorHandleService.errorHandle(error);
      return {
        ok: false,
        data: null,
        message: error.message || 'Error al actualizar el color.',
      };
    }
  }
  
  // Desactivar un color (eliminación lógica)
  async remove(id_color: string): Promise<{ ok: boolean; data: Color | null; message?: string }> {
    try {
      const color = await this.colorRepository.findOne({ where: { id_color } });
      if (!color) {
        throw new NotFoundException(`Color con ID "${id_color}" no encontrado`);
      }
      color.activo = !color.activo;
      const updatedColor = await this.colorRepository.save(color);
      return { ok: true, data: updatedColor };
    } catch (error) {
      this.errorHandleService.errorHandle(error);
      throw error;
    }
  }
}