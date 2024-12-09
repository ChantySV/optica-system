import { IsUUID } from 'class-validator';

export class CreateProductoProveedorDto {
  @IsUUID()
  id_producto: string;

  @IsUUID()
  id_proveedor: string;
}
