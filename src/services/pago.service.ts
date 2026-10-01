import { Pago, type PagoRow } from '../models/index.ts';
import { PagoRepository } from '../repositories/pago.repository.ts';
import type { CrearPagoDto, FiltroPagoDto } from '../dtos/pago.dto.ts';
import { CrudService } from './crud.service.ts';

export class PagoService extends CrudService<Pago, PagoRow, CrearPagoDto, FiltroPagoDto> {
  constructor(repository = new PagoRepository()) {
    super(repository, 'El pago');
  }

  protected construir(dto: CrearPagoDto): Pago {
    return new Pago(dto);
  }

  protected override aWhere(filtro: FiltroPagoDto): Partial<PagoRow> {
    return {
      ...(filtro.idPedido !== undefined && { id_pedido: filtro.idPedido }),
      ...(filtro.estadoPago !== undefined && { estado_pago: filtro.estadoPago }),
    };
  }
}

export const pagoService = new PagoService();
