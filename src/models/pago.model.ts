import { EstadoPago, type MetodoPago } from './enums.ts';

export interface PagoRow {
  id_pago: number;
  id_pedido: number;
  metodo_pago: MetodoPago | null;
  // DECIMAL(10,2): mysql2 lo devuelve como string
  monto: string;
  estado_pago: EstadoPago;
  fecha_pago: Date;
}

export interface PagoProps {
  idPago?: number | null;
  idPedido: number;
  metodoPago?: MetodoPago | null;
  monto: number;
  estadoPago?: EstadoPago;
  fechaPago?: Date | null;
}

export class Pago {
  static readonly tableName = 'pagos';
  static readonly primaryKey = 'id_pago';

  idPago: number | null;
  idPedido: number;
  metodoPago: MetodoPago | null;
  monto: number;
  estadoPago: EstadoPago;
  fechaPago: Date | null;

  constructor(props: PagoProps) {
    this.idPago = props.idPago ?? null;
    this.idPedido = props.idPedido;
    this.metodoPago = props.metodoPago ?? null;
    this.monto = props.monto;
    this.estadoPago = props.estadoPago ?? EstadoPago.PENDIENTE;
    this.fechaPago = props.fechaPago ?? null;
  }

  static fromRow(row: PagoRow): Pago {
    return new Pago({
      idPago: row.id_pago,
      idPedido: row.id_pedido,
      metodoPago: row.metodo_pago,
      monto: Number(row.monto),
      estadoPago: row.estado_pago,
      fechaPago: row.fecha_pago,
    });
  }

  toRow(): Partial<PagoRow> {
    return {
      ...(this.idPago !== null && { id_pago: this.idPago }),
      id_pedido: this.idPedido,
      metodo_pago: this.metodoPago,
      monto: this.monto.toFixed(2),
      estado_pago: this.estadoPago,
      ...(this.fechaPago !== null && { fecha_pago: this.fechaPago }),
    };
  }
}
