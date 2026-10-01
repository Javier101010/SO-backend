import { Producto, type ProductoRow } from '../models/index.ts';
import { ProductoRepository } from '../repositories/producto.repository.ts';
import type { CrearProductoDto, FiltroProductoDto } from '../dtos/producto.dto.ts';
import { CrudService } from './crud.service.ts';

export class ProductoService extends CrudService<Producto, ProductoRow, CrearProductoDto, FiltroProductoDto> {
  constructor(repository = new ProductoRepository()) {
    super(repository, 'El producto');
  }

  protected construir(dto: CrearProductoDto): Producto {
    return new Producto(dto);
  }

  protected override aWhere(filtro: FiltroProductoDto): Partial<ProductoRow> {
    return {
      ...(filtro.idCategoria !== undefined && { id_categoria: filtro.idCategoria }),
      ...(filtro.idArtesano !== undefined && { id_artesano: filtro.idArtesano }),
    };
  }
}

export const productoService = new ProductoService();
