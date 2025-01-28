import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePmpDto } from './dto/create-pmp.dto';
import { UpdatePmpDto } from './dto/update-pmp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConceptoEnum, Pmp } from './entities/pmp.entity';
import { Repository } from 'typeorm';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';
import { Producto } from '../productos/entities/producto.entity';

@Injectable()
export class PmpService {

  constructor(
    @InjectRepository(Pmp)
    private readonly pmpRepository: Repository<Pmp>,

    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    private readonly errorHandleService: ErrorHandleService,

  ) { }

  async createPmp(id_producto: string, cantidad: number, concepto: ConceptoEnum): Promise<Pmp> {
    try {
      // Verificar si el producto existe
      const producto = await this.productoRepository.findOne({ where: { id_producto } });

      if (!producto) {
        throw new BadRequestException('El producto no existe.');
      }

      let precio = producto.precio_compra;  
      if (concepto === ConceptoEnum.VENTA) {          
        precio = producto.precio_venta
      }
      
      const nuevoPmp = this.pmpRepository.create({
        producto,
        cantidad,
        concepto,
        precio,
      });

      return await this.pmpRepository.save(nuevoPmp);
    } catch (error) {
      console.error('Error al crear el PMP:', error);
      throw new BadRequestException('No se pudo crear el registro PMP.');
    }
  }

  async getPmpCompraData(searchQuery: string, page: number, limit: number) {
    try {
      const query = this.pmpRepository.createQueryBuilder('pmp')
        .leftJoinAndSelect('pmp.producto', 'producto')
        .where('pmp.concepto = :concepto', { concepto: 'compra' });

      if (searchQuery) {
        query.andWhere('producto.nombre ILIKE :search', { search: `%${searchQuery}%` });
      }

      query.orderBy('pmp.fecha', 'ASC')
        .skip((page - 1) * limit)
        .take(limit);

      const [data, total] = await query.getManyAndCount();

      const formattedData = this.formatPmpDataByProduct(data);

      return { ok: true, data: formattedData, total };
    } catch (error) {
      console.error('Error obteniendo PMP Compra:', error);
      return { ok: false, message: 'No se pudo obtener la información de PMP Compra.' };
    }
  }

  // Método para obtener datos PMP con concepto 'venta'
  async getPmpVentaData(searchQuery: string, page: number, limit: number) {
    try {
      const query = this.pmpRepository.createQueryBuilder('pmp')
        .leftJoinAndSelect('pmp.producto', 'producto')
        .where('pmp.concepto = :concepto', { concepto: 'venta' });

      if (searchQuery) {
        query.andWhere('producto.nombre ILIKE :search', { search: `%${searchQuery}%` });
      }

      query.orderBy('pmp.fecha', 'ASC')
        .skip((page - 1) * limit)
        .take(limit);

      const [data, total] = await query.getManyAndCount();

      const formattedData = this.formatPmpDataByProduct(data);

      return { ok: true, data: formattedData, total };
    } catch (error) {
      console.error('Error obteniendo PMP Venta:', error);
      return { ok: false, message: 'No se pudo obtener la información de PMP Venta.' };
    }
  }
  
 // Método para obtener datos Neto PMP con paginación
 async getPmpNetoData(
  searchQuery: string,
  page: number,
  limit: number
){
  try {
    const query = this.pmpRepository.createQueryBuilder('pmp')
      .leftJoin('pmp.producto', 'producto');

    if (searchQuery) {
      query.where('producto.nombre ILIKE :search', { search: `%${searchQuery}%` });
    }

    // Consulta para obtener los datos agregados
    const results = await query
      .select("TO_CHAR(pmp.fecha, 'Month YYYY')", 'mesAno')
      .addSelect(`SUM(CASE WHEN pmp.concepto = 'compra' THEN pmp.cantidad ELSE 0 END)`, 'compras')
      .addSelect(`SUM(CASE WHEN pmp.concepto = 'venta' THEN pmp.cantidad ELSE 0 END)`, 'ventas')
      .addSelect(`SUM(CASE WHEN pmp.concepto = 'compra' THEN (pmp.precio * pmp.cantidad) ELSE 0 END)`, 'comprasTotales')
      .addSelect(`SUM(CASE WHEN pmp.concepto = 'venta' THEN (pmp.precio * pmp.cantidad) ELSE 0 END)`, 'ventasTotales')
      .groupBy('"mesAno"') // Asegúrate de usar comillas dobles para el alias
      .orderBy('MIN(pmp.fecha)', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getRawMany();

    // Consulta para obtener el total de registros agrupados
    const totalQuery = this.pmpRepository.createQueryBuilder('pmp')
      .leftJoin('pmp.producto', 'producto');

    if (searchQuery) {
      totalQuery.where('producto.nombre ILIKE :search', { search: `%${searchQuery}%` });
    }

    const total = await totalQuery
      .select("TO_CHAR(pmp.fecha, 'Month YYYY')", 'mesAno')
      .groupBy('"mesAno"') // Igual que arriba
      .getCount();

    // Formatear los resultados
    const formattedData = results.map(item => ({
      mesAno: item.mesAno.trim(),
      compras: parseInt(item.compras, 10),
      ventas: parseInt(item.ventas, 10),
      comprasTotales: parseFloat(item.comprasTotales),
      ventasTotales: parseFloat(item.ventasTotales),
      balanceNeto: parseFloat(item.comprasTotales) - parseFloat(item.ventasTotales),
    }));

    return { ok: true, data: formattedData, total };
  } catch (error) {
    console.error('Error obteniendo PMP Neto:', error);
    return { ok: false, message: 'No se pudo obtener la información de PMP Neto.' };
  }
}
  
  private formatPmpDataByProduct(pmpEntries: Pmp[]) {
    const groupedData: Record<string, Record<string, any[]>> = {};

    pmpEntries.forEach((entry) => {
      const productoNombre = entry.producto.nombre;
      const fecha = new Date(entry.fecha);
      const monthYear = fecha.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

      if (!groupedData[productoNombre]) {
        groupedData[productoNombre] = {};
      }

      if (!groupedData[productoNombre][monthYear]) {
        groupedData[productoNombre][monthYear] = [];
      }

      groupedData[productoNombre][monthYear].push({
        fecha: fecha.toLocaleDateString('es-ES'),
        concepto: entry.concepto,
        cantidad: entry.cantidad,
        valor_unidad: entry.precio,
        valor_total: entry.precio * entry.cantidad,
      });
    });

    return Object.keys(groupedData).map((producto) => ({
      producto,
      meses: Object.keys(groupedData[producto]).map((mesAno) => ({
        fecha: mesAno.charAt(0).toUpperCase() + mesAno.slice(1),
        entradas: groupedData[producto][mesAno],
      })),
    }));
  }

}
