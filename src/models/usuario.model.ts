export interface UsuarioRow {
  id_usuario: number;
  id_rol: number;
  email: string;
  password_hash: string;
  nombre_completo: string;
  telefono: string | null;
  creado_en: Date;
}

export interface UsuarioProps {
  idUsuario?: number | null;
  idRol: number;
  email: string;
  passwordHash: string;
  nombreCompleto: string;
  telefono?: string | null;
  creadoEn?: Date | null;
}

// Forma del usuario que se puede devolver en la API (sin el hash)
export type UsuarioPublico = Omit<UsuarioProps, 'passwordHash'>;

export class Usuario {
  static readonly tableName = 'usuarios';
  static readonly primaryKey = 'id_usuario';

  idUsuario: number | null;
  idRol: number;
  email: string;
  passwordHash: string;
  nombreCompleto: string;
  telefono: string | null;
  creadoEn: Date | null;

  constructor(props: UsuarioProps) {
    this.idUsuario = props.idUsuario ?? null;
    this.idRol = props.idRol;
    this.email = props.email;
    this.passwordHash = props.passwordHash;
    this.nombreCompleto = props.nombreCompleto;
    this.telefono = props.telefono ?? null;
    this.creadoEn = props.creadoEn ?? null;
  }

  static fromRow(row: UsuarioRow): Usuario {
    return new Usuario({
      idUsuario: row.id_usuario,
      idRol: row.id_rol,
      email: row.email,
      passwordHash: row.password_hash,
      nombreCompleto: row.nombre_completo,
      telefono: row.telefono,
      creadoEn: row.creado_en,
    });
  }

  // creado_en lo asigna la BD (DEFAULT CURRENT_TIMESTAMP)
  toRow(): Partial<UsuarioRow> {
    return {
      ...(this.idUsuario !== null && { id_usuario: this.idUsuario }),
      id_rol: this.idRol,
      email: this.email,
      password_hash: this.passwordHash,
      nombre_completo: this.nombreCompleto,
      telefono: this.telefono,
    };
  }

  // Nunca exponer el hash de la contraseña en las respuestas de la API
  toJSON(): UsuarioPublico {
    const { passwordHash: _passwordHash, ...publico } = this;
    return publico;
  }
}
