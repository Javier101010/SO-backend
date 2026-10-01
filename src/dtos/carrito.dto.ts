import { v, type Parsed } from '../utils/validation.ts';

export const crearCarritoSchema = {
  idUsuario: v.id(),
  idProducto: v.id(),
  cantidad: v.entero({ min: 1, max: 4_294_967_295 }),
};

export const filtroCarritoSchema = {
  idUsuario: v.id({ requerido: false }),
};

export type CrearCarritoDto = Parsed<typeof crearCarritoSchema>;
export type FiltroCarritoDto = Parsed<typeof filtroCarritoSchema>;
