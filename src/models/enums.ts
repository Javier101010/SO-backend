export const EstadoPedido = {
  PENDIENTE: 'pendiente',
  PAGADO: 'pagado',
  ENVIADO: 'enviado',
  CANCELADO: 'cancelado',
} as const;
export type EstadoPedido = (typeof EstadoPedido)[keyof typeof EstadoPedido];

export const MetodoPago = {
  TARJETA: 'tarjeta',
  TRANSFERENCIA: 'transferencia',
  YAPE: 'yape',
  PLIN: 'plin',
} as const;
export type MetodoPago = (typeof MetodoPago)[keyof typeof MetodoPago];

export const EstadoPago = {
  PENDIENTE: 'pendiente',
  APROBADO: 'aprobado',
  RECHAZADO: 'rechazado',
} as const;
export type EstadoPago = (typeof EstadoPago)[keyof typeof EstadoPago];

// Valores de la tabla roles (id_rol)
export const RolId = {
  ADMINISTRADOR: 1,
  VENDEDOR: 2,
  CLIENTE: 3,
  ARTESANO: 4,
  ALMACEN: 5,
} as const;
export type RolId = (typeof RolId)[keyof typeof RolId];
