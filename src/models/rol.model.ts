export interface RolRow {
  id_rol: number;
  nombre: string;
}

export interface RolProps {
  idRol?: number | null;
  nombre: string;
}

export class Rol {
  static readonly tableName = 'roles';
  static readonly primaryKey = 'id_rol';

  idRol: number | null;
  nombre: string;

  constructor(props: RolProps) {
    this.idRol = props.idRol ?? null;
    this.nombre = props.nombre;
  }

  static fromRow(row: RolRow): Rol {
    return new Rol({
      idRol: row.id_rol,
      nombre: row.nombre,
    });
  }

  toRow(): Partial<RolRow> {
    return {
      ...(this.idRol !== null && { id_rol: this.idRol }),
      nombre: this.nombre,
    };
  }
}
