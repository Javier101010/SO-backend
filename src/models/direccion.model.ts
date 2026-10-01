export interface DireccionRow {
  id_direccion: number;
  id_usuario: number;
  direccion_linea: string;
  ciudad: string;
  departamento: string;
  codigo_postal: string | null;
}

export interface DireccionProps {
  idDireccion?: number | null;
  idUsuario: number;
  direccionLinea: string;
  ciudad: string;
  departamento: string;
  codigoPostal?: string | null;
}

export class Direccion {
  static readonly tableName = 'direcciones';
  static readonly primaryKey = 'id_direccion';

  idDireccion: number | null;
  idUsuario: number;
  direccionLinea: string;
  ciudad: string;
  departamento: string;
  codigoPostal: string | null;

  constructor(props: DireccionProps) {
    this.idDireccion = props.idDireccion ?? null;
    this.idUsuario = props.idUsuario;
    this.direccionLinea = props.direccionLinea;
    this.ciudad = props.ciudad;
    this.departamento = props.departamento;
    this.codigoPostal = props.codigoPostal ?? null;
  }

  static fromRow(row: DireccionRow): Direccion {
    return new Direccion({
      idDireccion: row.id_direccion,
      idUsuario: row.id_usuario,
      direccionLinea: row.direccion_linea,
      ciudad: row.ciudad,
      departamento: row.departamento,
      codigoPostal: row.codigo_postal,
    });
  }

  toRow(): Partial<DireccionRow> {
    return {
      ...(this.idDireccion !== null && { id_direccion: this.idDireccion }),
      id_usuario: this.idUsuario,
      direccion_linea: this.direccionLinea,
      ciudad: this.ciudad,
      departamento: this.departamento,
      codigo_postal: this.codigoPostal,
    };
  }
}
