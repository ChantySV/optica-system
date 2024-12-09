import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { ProductoProveedor } from './entities/produto-proveedor.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Proveedor } from '../proveedores/entities/proveedore.entity';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,

    @InjectRepository(ProductoProveedor)
    private readonly productoProveedorRepository: Repository<ProductoProveedor>,

    private readonly errorHandleService: ErrorHandleService,
  ) {}

  async create(createProductoDto: CreateProductoDto, id_proveedor: string): Promise<Producto> {
    try {
      const proveedor = await this.proveedorRepository.findOne({
        where: { id_proveedor: id_proveedor },
      });

      if (!proveedor) {
        throw new NotFoundException(`Proveedor con ID "${id_proveedor}" no encontrado`);
      }

      const producto = this.productoRepository.create(createProductoDto);
      const savedProducto = await this.productoRepository.save(producto);

      const productoProveedor = this.productoProveedorRepository.create({
        producto: { id_producto: savedProducto.id_producto },
        proveedor: { id_proveedor: id_proveedor },
      });

      await this.productoProveedorRepository.save(productoProveedor);

      return savedProducto;
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async findAll(): Promise<Producto[]> {
    try {
      return await this.productoRepository.find({
        where: { activo: true },
        relations: ['productosProveedores', 'detalleTrabajos'],
      });
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async findOne(id: string): Promise<Producto> {
    try {
      const producto = await this.productoRepository.findOne({
        where: { id_producto: id, activo: true },
        relations: ['productosProveedores', 'detalleTrabajos'],
      });

      if (!producto) {
        throw new NotFoundException(`Producto con ID "${id}" no encontrado`);
      }

      return producto;
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async update(id: string, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    try {
      const producto = await this.productoRepository.preload({
        id_producto: id,
        ...updateProductoDto,
      });

      if (!producto) {
        throw new NotFoundException(`Producto con ID "${id}" no encontrado`);
      }

      return await this.productoRepository.save(producto);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async remove(id: string): Promise<Producto> {
    try {
      const producto = await this.findOne(id);
      producto.activo = false; // Desactivación lógica
      return await this.productoRepository.save(producto);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async addProveedor(productoId: string, proveedorId: string): Promise<any> {
    try {
      const productoProveedor = this.productoProveedorRepository.create({
        producto: { id_producto: productoId },
        proveedor: { id_proveedor: proveedorId },
      });

      return await this.productoProveedorRepository.save(productoProveedor);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }
}
