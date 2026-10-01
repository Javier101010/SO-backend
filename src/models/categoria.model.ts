export interface CategoriaRow {
  id_categoria: number;
  nombre: string;
  descripcion: string | null;
}

export interface CategoriaProps {
  idCategoria?: number | null;
  nombre: string;
  descripcion?: string | null;
}

export class Categoria {
  static readonly tableName = 'categorias';
  static readonly primaryKey = 'id_categoria';

  idCategoria: number | null;
  nombre: string;
  descripcion: string | null;

  constructor(props: CategoriaProps) {
    this.idCategoria = props.idCategoria ?? null;
    this.nombre = props.nombre;
    this.descripcion = props.descripcion ?? null;
  }

  static fromRow(row: CategoriaRow): Categoria {
    return new Categoria({
      idCategoria: row.id_categoria,
      nombre: row.nombre,
      descripcion: row.descripcion,
    });
  }

  toRow(): Partial<CategoriaRow> {
    return {
      ...(this.idCategoria !== null && { id_categoria: this.idCategoria }),
      nombre: this.nombre,
      descripcion: this.descripcion,
    };
  }
}
