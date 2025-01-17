import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { ProductoProveedor } from './entities/produto-proveedor.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ProductoResponseDto } from './dto/response-producto.dto';
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

  async create(createProductoDto: CreateProductoDto): Promise<ProductoResponseDto> {
    try {
      const { id_proveedor, ...productoData } = createProductoDto;
  
      const proveedor = await this.proveedorRepository.findOne({
        where: { id_proveedor },
      });
  
      if (!proveedor) {
        throw new NotFoundException(`Proveedor con ID "${id_proveedor}" no encontrado`);
      }
  
      const producto = this.productoRepository.create(productoData);
      const savedProducto = await this.productoRepository.save(producto);
  
      const productoProveedor = this.productoProveedorRepository.create({
        producto: { id_producto: savedProducto.id_producto },
        proveedor: { id_proveedor },
      });
  
      await this.productoProveedorRepository.save(productoProveedor);
  
      return this.mapToResponseDto(savedProducto);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }
  
  async findAll(): Promise<ProductoResponseDto[]> {
    try {
      const productos = await this.productoRepository.find({
        where: { activo: true },
        relations: ['productosProveedores'],
      });

      return productos.map(this.mapToResponseDto);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async findOne(id: string): Promise<ProductoResponseDto> {
    try {
      const producto = await this.productoRepository.findOne({
        where: { id_producto: id, activo: true },
        relations: ['productosProveedores', 'detalleTrabajos'],
      });

      if (!producto) {
        throw new NotFoundException(`Producto con ID "${id}" no encontrado`);
      }

      return this.mapToResponseDto(producto);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async update(id: string, updateProductoDto: UpdateProductoDto): Promise<ProductoResponseDto> {
    try {
      const { id_proveedor, ...productoData } = updateProductoDto;
  
      // Buscar el producto existente
      const producto = await this.productoRepository.preload({
        id_producto: id,
        ...productoData,
      });
  
      if (!producto) {
        throw new NotFoundException(`Producto con ID "${id}" no encontrado`);
      }
        
      if (id_proveedor) {
        const proveedor = await this.proveedorRepository.findOne({ where: { id_proveedor } });
  
        if (!proveedor) {
          throw new NotFoundException(`Proveedor con ID "${id_proveedor}" no encontrado`);
        }
        
        const existingRelation = await this.productoProveedorRepository.findOne({
          where: { producto: { id_producto: id } },
        });
  
        if (existingRelation) {
          existingRelation.proveedor = proveedor;
          await this.productoProveedorRepository.save(existingRelation);
        } else {
          const newRelation = this.productoProveedorRepository.create({
            producto: { id_producto: id },
            proveedor: { id_proveedor },
          });
          await this.productoProveedorRepository.save(newRelation);
        }
      }      
      const updatedProducto = await this.productoRepository.save(producto);
  
      return this.mapToResponseDto(updatedProducto);
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }
  

  async remove(id: string): Promise<ProductoResponseDto> {
    try {
      const producto = await this.findOne(id);
      producto.activo = false; // Desactivación lógica
      const updatedProducto = await this.productoRepository.save(producto);
      return this.mapToResponseDto(updatedProducto);
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

  private mapToResponseDto(producto: Producto): ProductoResponseDto {
    return {
      id_producto: producto.id_producto,
      nombre: producto.nombre,
      stock: producto.stock,
      precio_compra: producto.precio_compra,
      precio_venta: producto.precio_venta,
      activo: producto.activo,
    };
  }
}
