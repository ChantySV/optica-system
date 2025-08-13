import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { Personal } from './entities/personal.entity';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';
import { PaginationDto } from 'src/common/pagination-dto';
import { QueryTrabajoDto } from 'src/mtrabajos/trabajos/dto/query-response-trabajo.dto';
import { QueryGetDto } from 'src/common/QueryGet-dto';
import { QueryPersonalDto } from './dto/query-response-personal.dto';

@Injectable()
export class PersonalService {
  constructor(
    @InjectRepository(Personal)
    private readonly personalRepository: Repository<Personal>,

    private readonly errorHandleService: ErrorHandleService,
  ) {}

  async create(createPersonalDto: CreatePersonalDto): Promise<{ ok: boolean; data: Personal }> {
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
  
      return { ok: true, data: savedPersonal };
    } catch (error) {
      this.errorHandleService.errorHandle(error);
      throw error;
    }
  }

  async findAll( paginationDto : PaginationDto): Promise<Personal[]> {
    try {
      const{ limit, offset } = paginationDto

      return await this.personalRepository.find({
        where: { activo: true },
        relations: ['usuario'], 
        take: limit,
        skip: offset,
      })
    } catch (error) {
      this.errorHandleService.errorHandle(error); 
    }
  }
    
  async findAllNaturales(
    paginationDto: PaginationDto,
    queryTrabajoDto: QueryTrabajoDto,
    queryGetDto: QueryGetDto
  ) {
    try {
      const { limit, offset } = paginationDto;
      const { order = 'ASC' } = queryGetDto;
      const { sortBy = 'nombres' } = queryTrabajoDto;
      const [naturales, total] = await this.personalRepository.findAndCount({
        where: { tipo_persona: 'natural' },
        relations: ['usuario'],
        take: limit,
        skip: offset,
        order: { [sortBy]: order }
      });
      return { naturales, total };
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  //Solo Nombre
  async findPersonal() {
    try {
      return await this.personalRepository.find(
        {
          where: { activo: true, tipo_persona: 'juridica' },
          select: ['id_personal', 'nombres']
        });
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

 //BUscar Juridicos
  async findAllJuridicos(
    paginationDto: PaginationDto,
    queryGetDto: QueryGetDto,    
    queryPersonalDto: QueryPersonalDto,
  ){
    const { limit, offset } = paginationDto;
    const { sortBy = 'nombres' } = queryPersonalDto;
    const { order = 'ASC' } = queryGetDto
    try {
      const [juridicos, total] = await this.personalRepository.findAndCount({
        where: { tipo_persona: 'juridica' },
        take: limit,
        skip: offset,
        order: { [sortBy]: order },
      });
      return { juridicos, total };
    } catch (error) {
      this.errorHandleService.errorHandle(error);
      throw new BadRequestException('Error al obtener la lista de jurídicos.');
    }
  }

 //Buscar Juridicos-admin
 async findAllJuridicosAdmin() {
  try {
    const data = await this.personalRepository
      .createQueryBuilder('personal')
      .leftJoin('personal.usuario', 'usuario') 
      .where('personal.tipo_persona = :tipo', { tipo: 'juridica' })
      .andWhere('personal.activo = :activo', { activo: true })
      .andWhere('usuario.id_usuario IS NULL')
      .getMany();

    return {
      ok:true,
      data
    };
  } catch (error) {
    this.errorHandleService.errorHandle(error);
    throw new BadRequestException('Error al obtener la lista de jurídicos.');
  }
}

  async searchPersonaAdmin(search: string): Promise<{ personas: Personal[]; total: number }> {
    try {
      const [personas, total] = await this.personalRepository.findAndCount({
        where: [
          { nombres: ILike(`%${search.toLowerCase()}%`), activo: true },
          { apellido_paterno: ILike(`%${search.toLowerCase()}%`), activo: true },
        ],
        select: ['id_personal', 'nombres', 'apellido_paterno', 'apellido_materno', 'email', 'telefono', 'activo'],
      });

      return { personas, total };
    } catch (error) {
      this.errorHandleService.errorHandle(error);
      throw new BadRequestException('Error al realizar la búsqueda de personal.');
    }
  }

  //Solo Nombre
  async searchPersonaVenta(search: string) {
    try {
      return await this.personalRepository.find({
        where: [
          {
            activo: true,
            nombres: ILike(`%${search.toLowerCase()}%`),
          },
          {
            activo: true,
            apellido_paterno: ILike(`%${search.toLowerCase()}%`),
          },
        ],
        select: ['id_personal', 'nombres', 'apellido_paterno'], 
      });
    } catch (error) {
      this.errorHandleService.errorHandle(error);
      throw new Error('Error al realizar la búsqueda de personal.');
    }
  }

  async findOne(id: string): Promise<Personal> {
    try {
      const personal = await this.personalRepository.findOne({
        where: { id_personal: id},
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

  async update(id: string, updatePersonalDto: UpdatePersonalDto): Promise<{ ok: boolean; data: Personal }> {
    try {
      if (updatePersonalDto.email) {
        const existingPersonal = await this.personalRepository.findOne({ where: { email: updatePersonalDto.email } });
        if (existingPersonal && existingPersonal.id_personal !== id) {
          throw new ConflictException('El email proporcionado ya está en uso.');
        }
      }

      const personal = await this.personalRepository.preload({
        id_personal: id,
        ...updatePersonalDto,
      });

      if (!personal) {
        throw new NotFoundException(`Personal con ID "${id}" no encontrado`);
      }

      const updatedPersonal = await this.personalRepository.save(personal);

      return { ok: true, data: updatedPersonal };
    } catch (error) {
      console.log(error);
      this.errorHandleService.errorHandle(error);
      throw error; 
    }
  }
   
  async remove(id: string): Promise<{ ok: boolean; data: Personal }> {
   try {
      const personal = await this.findOne(id);
      if (!personal) {
        throw new NotFoundException(`Personal con ID "${id}" no encontrado`);
      }
      personal.activo = !personal.activo; 
      const updatedPersonal = await this.personalRepository.save(personal);
      return { ok: true, data: updatedPersonal };
    } catch (error) {
      this.errorHandleService.errorHandle(error);
      throw error;
    }
  }

}
