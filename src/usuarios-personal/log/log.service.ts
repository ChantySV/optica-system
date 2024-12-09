import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { Log } from './entities/log.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {}
  
  async create(createLogDto: CreateLogDto): Promise<Log> {
    try {
      const log = this.logRepository.create(createLogDto); 
      return await this.logRepository.save(log); 
    } catch (error) {
      throw new Error('Error al crear el log: ' + error.message); 
    }
  }

  async findAll(): Promise<Log[]> {
    try {
      return await this.logRepository.find({ relations: ['usuario'] });
    } catch (error) {
      throw new Error('Error al obtener los logs: ' + error.message);
    }
  }
  
  async findOne(id: string): Promise<Log> {
    const log = await this.logRepository.findOne({
      where: { id_log: id },
      relations: ['usuario'],
    });

    if (!log) {
      throw new NotFoundException(`Log con ID "${id}" no encontrado`);
    }

    return log;
  }
}
