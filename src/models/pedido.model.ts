import { EstadoPedido } from './enums.ts';

export interface PedidoRow {
  id_pedido: number;
  id_usuario: number;
  id_direccion: number;
  // DECIMAL(10,2): mysql2 lo devuelve como string
  total: string;
  estado: EstadoPedido;
  fecha_pedido: Date;
}

export interface PedidoProps {
  idPedido?: number | null;
  idUsuario: number;
  idDireccion: number;
  total: number;
  estado?: EstadoPedido;
  fechaPedido?: Date | null;
}

export class Pedido {
  static readonly tableName = 'pedidos';
  static readonly primaryKey = 'id_pedido';

  idPedido: number | null;
  idUsuario: number;
  idDireccion: number;
  total: number;
  estado: EstadoPedido;
  fechaPedido: Date | null;

  constructor(props: PedidoProps) {
    this.idPedido = props.idPedido ?? null;
    this.idUsuario = props.idUsuario;
    this.idDireccion = props.idDireccion;
    this.total = props.total;
    this.estado = props.estado ?? EstadoPedido.PENDIENTE;
    this.fechaPedido = props.fechaPedido ?? null;
  }

  static fromRow(row: PedidoRow): Pedido {
    return new Pedido({
      idPedido: row.id_pedido,
      idUsuario: row.id_usuario,
      idDireccion: row.id_direccion,
      total: Number(row.total),
      estado: row.estado,
      fechaPedido: row.fecha_pedido,
    });
  }

  toRow(): Partial<PedidoRow> {
    return {
      ...(this.idPedido !== null && { id_pedido: this.idPedido }),
      id_usuario: this.idUsuario,
      id_direccion: this.idDireccion,
      total: this.total.toFixed(2),
      estado: this.estado,
      ...(this.fechaPedido !== null && { fecha_pedido: this.fechaPedido }),
    };
  }
}
