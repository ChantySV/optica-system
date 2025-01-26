import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { ProductoProveedor } from './entities/produto-proveedor.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ProductoResponseDto } from './dto/response-producto.dto';
import { Proveedor } from '../proveedores/entities/proveedore.entity';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';
import { PaginationDto } from 'src/common/pagination-dto';
import { QueryGetDto } from 'src/common/QueryGet-dto';
import { QueryProductoDto } from './dto/query-producto.dto';

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
  ) { }

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

      return savedProducto;
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async searchProducto(search: string, paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    try {
      const [productos, total] = await this.proveedorRepository.findAndCount({
        where: {
          nombre: Like(`%${search}%`),
          activo: true,
        },
        take: limit,
        skip: offset,
      });
      return { productos, total };
    } catch (error) {
      throw new Error('Error al buscar proveedores');
    }
  }

  async findAllAdmin(
    paginationDto: PaginationDto,
    queryGetDto: QueryGetDto,
    queryProductoDto: QueryProductoDto,
  ) {
    const { limit, offset } = paginationDto;
    const { order = 'ASC' } = queryGetDto;
    const { sortBy = 'nombre' } = queryProductoDto;
    try {
      const [productos, total] = await this.productoRepository.findAndCount({
        take: limit,
        skip: offset,
        order: { [sortBy]: order }
      })
      return { productos, total }
    } catch (error) {
      this.errorHandleService.errorHandle(error);

    }
  }

  async findAll(
    paginationDto: PaginationDto,
    queryGetDto: QueryGetDto,
    queryProductoDto: QueryProductoDto,
  ) {
    const { limit, offset } = paginationDto;
    const { order = 'ASC' } = queryGetDto;
    const { sortBy = 'nombre' } = queryProductoDto;

    try {
      const [productos, total] = await this.productoRepository.findAndCount({
        where: { activo: true },
        relations: ['productosProveedores', 'productosProveedores.proveedor'],
        take: limit,
        skip: offset,
        order: { [sortBy]: order },
      });

      // Mapeo de los productos
      const result = productos.map((producto) => ({
        id_producto: producto.id_producto,
        nombre: producto.nombre,
        precio_compra: producto.precio_compra,
        precio_venta: producto.precio_venta,
        stock: producto.stock,
        activo: producto.activo,
        proveedores: producto.productosProveedores.map((productoProveedor) => ({
          id_proveedor: productoProveedor.proveedor.id_proveedor,
          nombre: productoProveedor.proveedor.nombre,
        })),
      }));

      return {
        result,
        total,
      };
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  // Obtener todos los productos activos
  async findProdutos() {
    try {
      return await this.productoRepository.find({ where: { activo: true }, select: ['id_producto', 'nombre'] });
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async findOne(id: string) {
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

  async update(id: string, updateProductoDto: UpdateProductoDto) {
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

      return updatedProducto;
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }

  async remove(id: string) {
    try {
      const producto = await this.findOne(id);

      if (!producto) {
        throw new NotFoundException(`Producto con ID "${id}" no encontrado`);
      }

      producto.activo = false;
      const updatedProducto = await this.productoRepository.save(producto);
      return updatedProducto;
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }


  async addProveedor(productoId: string, proveedorId: string) {
    try {
      const productoProveedor = this.productoProveedorRepository.create({
        producto: { id_producto: productoId },
        proveedor: { id_proveedor: proveedorId },
      });

      return productoProveedor;
    } catch (error) {
      this.errorHandleService.errorHandle(error);
    }
  }
}
