import { v, type Parsed } from '../utils/validation.ts';

export const crearProductoSchema = {
  idCategoria: v.id(),
  idArtesano: v.id(),
  nombre: v.texto({ max: 120 }),
  sku: v.texto({ max: 50 }),
  precio: v.decimal(),
  stock: v.entero({ min: 0, max: 4_294_967_295 }),
};

export const filtroProductoSchema = {
  idCategoria: v.id({ requerido: false }),
  idArtesano: v.id({ requerido: false }),
};

export type CrearProductoDto = Parsed<typeof crearProductoSchema>;
export type FiltroProductoDto = Parsed<typeof filtroProductoSchema>;
