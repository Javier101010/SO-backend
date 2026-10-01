import { v, type Parsed } from '../utils/validation.ts';

export const crearDetallePedidoSchema = {
  idProducto: v.id(),
  cantidad: v.entero({ min: 1, max: 4_294_967_295 }),
  precioUnitario: v.decimal(),
};

// id_producto es parte de la clave primaria, por eso no se puede modificar
export const actualizarDetallePedidoSchema = {
  cantidad: crearDetallePedidoSchema.cantidad,
  precioUnitario: crearDetallePedidoSchema.precioUnitario,
};

export type CrearDetallePedidoDto = Parsed<typeof crearDetallePedidoSchema>;
export type ActualizarDetallePedidoDto = Partial<Parsed<typeof actualizarDetallePedidoSchema>>;
