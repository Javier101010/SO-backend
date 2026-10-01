import { Carrito, type CarritoRow } from '../models/index.ts';
import { CarritoRepository } from '../repositories/carrito.repository.ts';
import type { CrearCarritoDto, FiltroCarritoDto } from '../dtos/carrito.dto.ts';
import { CrudService } from './crud.service.ts';

export class CarritoService extends CrudService<Carrito, CarritoRow, CrearCarritoDto, FiltroCarritoDto> {
  constructor(repository = new CarritoRepository()) {
    super(repository, 'El ítem del carrito');
  }

  protected construir(dto: CrearCarritoDto): Carrito {
    return new Carrito(dto);
  }

  protected override aWhere(filtro: FiltroCarritoDto): Partial<CarritoRow> {
    return { ...(filtro.idUsuario !== undefined && { id_usuario: filtro.idUsuario }) };
  }
}

export const carritoService = new CarritoService();
