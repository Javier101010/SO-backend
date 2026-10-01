import { EstadoPago, MetodoPago } from '../models/index.ts';
import { v, type Parsed } from '../utils/validation.ts';

export const crearPagoSchema = {
  idPedido: v.id(),
  metodoPago: v.nulable(v.enumerado(MetodoPago)),
  monto: v.decimal(),
  estadoPago: v.enumerado(EstadoPago, { requerido: false }),
};

export const filtroPagoSchema = {
  idPedido: v.id({ requerido: false }),
  estadoPago: v.enumerado(EstadoPago, { requerido: false }),
};

export type CrearPagoDto = Parsed<typeof crearPagoSchema>;
export type FiltroPagoDto = Parsed<typeof filtroPagoSchema>;
