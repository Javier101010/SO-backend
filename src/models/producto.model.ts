export interface ProductoRow {
  id_producto: number;
  id_categoria: number;
  id_artesano: number;
  nombre: string;
  sku: string;
  // DECIMAL(10,2): mysql2 lo devuelve como string
  precio: string;
  stock: number;
}

export interface ProductoProps {
  idProducto?: number | null;
  idCategoria: number;
  idArtesano: number;
  nombre: string;
  sku: string;
  precio: number;
  stock: number;
}

export class Producto {
  static readonly tableName = 'productos';
  static readonly primaryKey = 'id_producto';

  idProducto: number | null;
  idCategoria: number;
  idArtesano: number;
  nombre: string;
  sku: string;
  precio: number;
  stock: number;

  constructor(props: ProductoProps) {
    this.idProducto = props.idProducto ?? null;
    this.idCategoria = props.idCategoria;
    this.idArtesano = props.idArtesano;
    this.nombre = props.nombre;
    this.sku = props.sku;
    this.precio = props.precio;
    this.stock = props.stock;
  }

  static fromRow(row: ProductoRow): Producto {
    return new Producto({
      idProducto: row.id_producto,
      idCategoria: row.id_categoria,
      idArtesano: row.id_artesano,
      nombre: row.nombre,
      sku: row.sku,
      precio: Number(row.precio),
      stock: row.stock,
    });
  }

  toRow(): Partial<ProductoRow> {
    return {
      ...(this.idProducto !== null && { id_producto: this.idProducto }),
      id_categoria: this.idCategoria,
      id_artesano: this.idArtesano,
      nombre: this.nombre,
      sku: this.sku,
      precio: this.precio.toFixed(2),
      stock: this.stock,
    };
  }
}
