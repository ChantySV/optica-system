import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConceptoEnum, Pmp } from './entities/pmp.entity';
import { Producto } from '../productos/entities/producto.entity';

@Injectable()
export class PmpService {
  constructor(
    @InjectRepository(Pmp)
    private readonly pmpRepository: Repository<Pmp>,

    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async createPmp(id_producto: string, cantidad: number, concepto: ConceptoEnum): Promise<Pmp> {
    const producto = await this.productoRepository.findOne({ where: { id_producto } });
    if (!producto) {
      throw new BadRequestException('El producto no existe.');
    }

    const precio_unitario =
      concepto === ConceptoEnum.VENTA
        ? producto.precio_venta
        : producto.precio_compra;

    const valor_total = precio_unitario * cantidad;

    const nuevoPmp = this.pmpRepository.create({
      producto,
      cantidad,
      concepto,
      precio_unitario,
      valor_total,
    });

    return await this.pmpRepository.save(nuevoPmp);
  }

  async getPmpData(
    tipo: 'compra' | 'venta' | 'neto',
    searchQuery: string,
    page: number,
    limit: number,
  ) {
    switch (tipo) {
      case 'compra':
        return this.getCompraOVentaData(ConceptoEnum.COMPRA, searchQuery, page, limit);
      case 'venta':
        return this.getCompraOVentaData(ConceptoEnum.VENTA, searchQuery, page, limit);
      case 'neto':
        return this.getNetoData(searchQuery, page, limit);
      default:
        throw new BadRequestException('Tipo de PMP inválido. Debe ser compra, venta o neto.');
    }
  }

  private async getCompraOVentaData(
    concepto: ConceptoEnum,
    searchQuery: string,
    page: number,
    limit: number,
  ) {
    try {
      const query = this.pmpRepository
        .createQueryBuilder('pmp')
        .leftJoinAndSelect('pmp.producto', 'producto')
        .where('pmp.concepto = :concepto', { concepto });

      if (searchQuery) {
        query.andWhere('producto.nombre ILIKE :search', {
          search: `%${searchQuery}%`,
        });
      }

      query.orderBy('pmp.fecha', 'ASC')
        .skip((page - 1) * limit)
        .take(limit);

      const [data, total] = await query.getManyAndCount();

      const formattedData = this.formatPmpDataByProduct(data);

      return { ok: true, data: formattedData, total };
    } catch (error) {
      console.error('Error obteniendo PMP:', error);
      return { ok: false, message: 'No se pudo obtener la información.' };
    }
  }

private async getNetoData(
  searchQuery: string,
  page: number,
  limit: number,
) {
  try {
    const dateFormat = "TO_CHAR(pmp.fecha, 'Month YYYY')";

    const query = this.pmpRepository.createQueryBuilder('pmp')
      .leftJoin('pmp.producto', 'producto');

    if (searchQuery) {
      query.where('producto.nombre ILIKE :search', {
        search: `%${searchQuery}%`,
      });
    }

    const results = await query
      .select(`${dateFormat}`, 'mesAno')
      .addSelect(`SUM(CASE WHEN pmp.concepto = 'compra' THEN pmp.cantidad ELSE 0 END)`, 'compras')
      .addSelect(`SUM(CASE WHEN pmp.concepto = 'venta' THEN pmp.cantidad ELSE 0 END)`, 'ventas')
      .addSelect(`SUM(CASE WHEN pmp.concepto = 'compra' THEN pmp.valor_total ELSE 0 END)`, 'comprasTotales')
      .addSelect(`SUM(CASE WHEN pmp.concepto = 'venta' THEN pmp.valor_total ELSE 0 END)`, 'ventasTotales')
      .groupBy(`${dateFormat}`)
      .orderBy('MIN(pmp.fecha)', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getRawMany();

    const totalQuery = this.pmpRepository.createQueryBuilder('pmp')
      .leftJoin('pmp.producto', 'producto');

    if (searchQuery) {
      totalQuery.where('producto.nombre ILIKE :search', {
        search: `%${searchQuery}%`,
      });
    }

    const total = await totalQuery
      .select(`${dateFormat}`, 'mesAno')
      .groupBy(`${dateFormat}`)
      .getCount();

    const formattedData = results.map((item) => ({
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
        valor_unidad: entry.precio_unitario,
        valor_total: entry.valor_total,
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
