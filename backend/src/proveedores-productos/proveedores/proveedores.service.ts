import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { CreateProveedoreDto } from "./dto/create-proveedore.dto";
import { UpdateProveedoreDto } from "./dto/update-proveedore.dto";
import { Proveedor } from "./entities/proveedore.entity";
import { ProveedorResponseDto } from "./dto/response-proveedore.dto";
import { ErrorHandleService } from "src/common/services/error-handle/error-handle.service";
import { PaginationDto } from "src/common/pagination-dto";
import { QueryGetDto } from "src/common/QueryGet-dto";

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
    private readonly errorHandleService: ErrorHandleService,
  ) { }
  
  private cleanUrl(url: string): string {
    let cleanedUrl = url.replace(/^(https?:\/\/)?(www\.)?/, ''); 
    cleanedUrl = cleanedUrl.split('/')[0]; 
    return cleanedUrl;
  }
  
  async create(createProveedoreDto: CreateProveedoreDto): Promise<ProveedorResponseDto> {
    try {
      if (createProveedoreDto.direccion_web) {
        createProveedoreDto.direccion_web = this.cleanUrl(createProveedoreDto.direccion_web);
      }
  
      const existingProveedor = await this.proveedorRepository.findOne({
        where: { nombre: createProveedoreDto.nombre, activo: true },
      });
  
      if (existingProveedor) {
        throw new BadRequestException(`El nombre de proveedor '${createProveedoreDto.nombre}' ya está en uso.`);
      }
  
      const proveedor = this.proveedorRepository.create(createProveedoreDto);
      const savedProveedor = await this.proveedorRepository.save(proveedor);
  
      return this.mapToDto(savedProveedor);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
      throw error;
    }
  }
  
  

  
  async findProveedor() {    
    try {
      const proveedores = await this.proveedorRepository.find({
        where: { activo: true },
        select:['id_proveedor', 'nombre']        
      });
      return {
        proveedores
      }
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async findAll(paginationDto: PaginationDto, queryGetDto: QueryGetDto) {
    const { limit, offset } = paginationDto;
    const { order = 'ASC', sortBy = 'nombre', search } = queryGetDto;
    
    try {
      const query = this.proveedorRepository.createQueryBuilder('proveedor')
        .where('proveedor.activo = :activo', { activo: true });
  
      if (search) {
        query.andWhere('LOWER(proveedor.nombre) LIKE LOWER(:search)', { search: `%${search}%` });
      }
  
      query.orderBy(`proveedor.${sortBy}`, order as 'ASC' | 'DESC')
        .skip(offset)
        .take(limit);
  
      const [proveedores, total] = await query.getManyAndCount();
      return { proveedores, total };
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }
  

  async searchProveedores(search: string, paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    try {
      const [proveedores, total] = await this.proveedorRepository.findAndCount({
        where: {
          nombre: Like(`%${search}%`),
          activo: true,
        },
        take: limit,
        skip: offset,
      });

      return { proveedores, total };
    } catch (error) {
      throw new Error('Error al buscar proveedores');
    }
  }

  async findOne(id: string): Promise<ProveedorResponseDto> {
    try {
      const proveedor = await this.getProveedorOrFail(id);
      return this.mapToDto(proveedor);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async update(id: string, updateProveedoreDto: UpdateProveedoreDto): Promise<ProveedorResponseDto> {
    try {
      if (updateProveedoreDto.direccion_web) {
        updateProveedoreDto.direccion_web = this.cleanUrl(updateProveedoreDto.direccion_web);
      }
  
      const proveedor = await this.proveedorRepository.preload({
        id_proveedor: id,
        ...updateProveedoreDto,
      });
  
      if (!proveedor) throw new NotFoundException(`Proveedor con ID "${id}" no encontrado`);
  
      const savedProveedor = await this.proveedorRepository.save(proveedor);
      return this.mapToDto(savedProveedor);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async remove(id: string): Promise<ProveedorResponseDto> {
    try {
      const proveedor = await this.getProveedorOrFail(id);
      proveedor.activo = false;
      const savedProveedor = await this.proveedorRepository.save(proveedor);
      return this.mapToDto(savedProveedor);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  private async getProveedorOrFail(id: string): Promise<Proveedor> {
    const proveedor = await this.proveedorRepository.findOne({
      where: { id_proveedor: id, activo: true },
    });

    if (!proveedor) throw new NotFoundException(`Proveedor con ID "${id}" no encontrado`);

    return proveedor;
  }

  private mapToDto(proveedor: Proveedor): ProveedorResponseDto {
    return {
      id_proveedor: proveedor.id_proveedor,
      nombre: proveedor.nombre,
      numero: proveedor.numero,
      direccion_web: proveedor.direccion_web,
      activo: proveedor.activo,
    };
  }
}