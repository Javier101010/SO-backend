export interface CarritoRow {
  id_carrito: number;
  id_usuario: number;
  id_producto: number;
  cantidad: number;
}

export interface CarritoProps {
  idCarrito?: number | null;
  idUsuario: number;
  idProducto: number;
  cantidad: number;
}

export class Carrito {
  static readonly tableName = 'carrito';
  static readonly primaryKey = 'id_carrito';

  idCarrito: number | null;
  idUsuario: number;
  idProducto: number;
  cantidad: number;

  constructor(props: CarritoProps) {
    this.idCarrito = props.idCarrito ?? null;
    this.idUsuario = props.idUsuario;
    this.idProducto = props.idProducto;
    this.cantidad = props.cantidad;
  }

  static fromRow(row: CarritoRow): Carrito {
    return new Carrito({
      idCarrito: row.id_carrito,
      idUsuario: row.id_usuario,
      idProducto: row.id_producto,
      cantidad: row.cantidad,
    });
  }

  toRow(): Partial<CarritoRow> {
    return {
      ...(this.idCarrito !== null && { id_carrito: this.idCarrito }),
      id_usuario: this.idUsuario,
      id_producto: this.idProducto,
      cantidad: this.cantidad,
    };
  }
}
