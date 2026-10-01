import { EstadoPedido } from '../models/index.ts';
import { v, type Parsed } from '../utils/validation.ts';

export const crearPedidoSchema = {
  idUsuario: v.id(),
  idDireccion: v.id(),
  total: v.decimal(),
  estado: v.enumerado(EstadoPedido, { requerido: false }),
};

export const filtroPedidoSchema = {
  idUsuario: v.id({ requerido: false }),
  estado: v.enumerado(EstadoPedido, { requerido: false }),
};

export type CrearPedidoDto = Parsed<typeof crearPedidoSchema>;
export type FiltroPedidoDto = Parsed<typeof filtroPedidoSchema>;
