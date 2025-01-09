import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { Personal } from './entities/personal.entity';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';

@Injectable()
export class PersonalService {
  constructor(
    @InjectRepository(Personal)
    private readonly personalRepository: Repository<Personal>,

    private readonly errorHandleService: ErrorHandleService,
  ) {}

  async create(createPersonalDto: CreatePersonalDto): Promise<Personal> {
    try {
      const { email, telefono } = createPersonalDto;
        
      if (email) {
        const existingEmail = await this.personalRepository.findOne({
          where: { email },
        });
        if (existingEmail) {
          throw new BadRequestException(`El email "${email}" ya está registrado.`);
        }
      }
  
      if (telefono) {
        const existingTelefono = await this.personalRepository.findOne({
          where: { telefono },
        });
        if (existingTelefono) {
          throw new BadRequestException(
            `El teléfono "${telefono}" ya está registrado.`
          );
        }
      }
  
      const personal = this.personalRepository.create(createPersonalDto);
  
      const savedPersonal = await this.personalRepository.save(personal);
  
      return savedPersonal;
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async findAll(): Promise<Personal[]> {
    try {
      return await this.personalRepository.find({
        where: { activo: true },
        relations: ['usuario', 'trabajos'], 
      });
    } catch (error) {
      this.errorHandleService.errorHandle(error); 
    }
  }

  async findOne(id: string): Promise<Personal> {
    try {
      const personal = await this.personalRepository.findOne({
        where: { id_personal: id, activo: true },
        relations: ['usuario', 'trabajos'],
      });

      if (!personal) {
        throw new NotFoundException(`Personal con ID "${id}" no encontrado`);
      }

      return personal;
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async update(id: string, updatePersonalDto: UpdatePersonalDto): Promise<Personal> {
    try {
      const personal = await this.personalRepository.preload({
        id_personal: id,
        ...updatePersonalDto,
      });

      if (!personal) {
        throw new NotFoundException(`Personal con ID "${id}" no encontrado`);
      }

      return await this.personalRepository.save(personal);
    } catch (error) {
      this.errorHandleService.errorHandle(error); 
    }
  }  
   
  async remove(id: string): Promise<Personal> {
    try {
      const personal = await this.findOne(id);
      personal.activo = false; 
      return await this.personalRepository.save(personal);
    } catch (error) {
      this.errorHandleService.errorHandle(error); 
    }
  }
}
