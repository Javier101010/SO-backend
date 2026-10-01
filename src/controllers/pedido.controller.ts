import { crearPedidoSchema, filtroPedidoSchema } from '../dtos/pedido.dto.ts';
import { pedidoService } from '../services/pedido.service.ts';
import { CrudController } from './crud.controller.ts';

export const pedidoController = new CrudController(pedidoService, {
  crear: crearPedidoSchema,
  filtros: filtroPedidoSchema,
});
