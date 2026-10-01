export interface DetallePedidoRow {
  id_pedido: number;
  id_producto: number;
  cantidad: number;
  // DECIMAL(10,2): mysql2 lo devuelve como string
  precio_unitario: string;
}

export interface DetallePedidoProps {
  idPedido: number;
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
}

export class DetallePedido {
  static readonly tableName = 'detalle_pedidos';
  // Clave primaria compuesta
  static readonly primaryKey = ['id_pedido', 'id_producto'] as const;

  idPedido: number;
  idProducto: number;
  cantidad: number;
  precioUnitario: number;

  constructor(props: DetallePedidoProps) {
    this.idPedido = props.idPedido;
    this.idProducto = props.idProducto;
    this.cantidad = props.cantidad;
    this.precioUnitario = props.precioUnitario;
  }

  get subtotal(): number {
    return this.cantidad * this.precioUnitario;
  }

  static fromRow(row: DetallePedidoRow): DetallePedido {
    return new DetallePedido({
      idPedido: row.id_pedido,
      idProducto: row.id_producto,
      cantidad: row.cantidad,
      precioUnitario: Number(row.precio_unitario),
    });
  }

  toRow(): DetallePedidoRow {
    return {
      id_pedido: this.idPedido,
      id_producto: this.idProducto,
      cantidad: this.cantidad,
      precio_unitario: this.precioUnitario.toFixed(2),
    };
  }
}
