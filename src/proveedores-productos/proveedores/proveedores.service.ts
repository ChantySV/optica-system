import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProveedoreDto } from "./dto/create-proveedore.dto";
import { UpdateProveedoreDto } from "./dto/update-proveedore.dto";
import { Proveedor } from "./entities/proveedore.entity";
import { ProveedorResponseDto } from "./dto/response-proveedore.dto";
import { ErrorHandleService } from "src/common/services/error-handle/error-handle.service";

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
    private readonly errorHandleService: ErrorHandleService,
  ) {}

  async create(createProveedoreDto: CreateProveedoreDto): Promise<ProveedorResponseDto> {
    try {
      const proveedor = this.proveedorRepository.create(createProveedoreDto);
      const savedProveedor = await this.proveedorRepository.save(proveedor);
      return this.mapToDto(savedProveedor);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async findAll(): Promise<ProveedorResponseDto[]> {
    try {
      const proveedores = await this.proveedorRepository.find({ where: { activo: true } });
      return proveedores.map(this.mapToDto);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
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