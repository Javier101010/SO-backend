import { Pedido, type PedidoRow } from '../models/index.ts';
import { PedidoRepository } from '../repositories/pedido.repository.ts';
import type { CrearPedidoDto, FiltroPedidoDto } from '../dtos/pedido.dto.ts';
import { CrudService } from './crud.service.ts';

export class PedidoService extends CrudService<Pedido, PedidoRow, CrearPedidoDto, FiltroPedidoDto> {
  constructor(repository = new PedidoRepository()) {
    super(repository, 'El pedido');
  }

  protected construir(dto: CrearPedidoDto): Pedido {
    return new Pedido(dto);
  }

  protected override aWhere(filtro: FiltroPedidoDto): Partial<PedidoRow> {
    return {
      ...(filtro.idUsuario !== undefined && { id_usuario: filtro.idUsuario }),
      ...(filtro.estado !== undefined && { estado: filtro.estado }),
    };
  }
}

export const pedidoService = new PedidoService();
