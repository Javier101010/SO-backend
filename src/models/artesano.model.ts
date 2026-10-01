export interface ArtesanoRow {
  id_artesano: number;
  nombres: string;
  comunidad: string;
  telefono: string | null;
}

export interface ArtesanoProps {
  idArtesano?: number | null;
  nombres: string;
  comunidad: string;
  telefono?: string | null;
}

export class Artesano {
  static readonly tableName = 'artesanos';
  static readonly primaryKey = 'id_artesano';

  idArtesano: number | null;
  nombres: string;
  comunidad: string;
  telefono: string | null;

  constructor(props: ArtesanoProps) {
    this.idArtesano = props.idArtesano ?? null;
    this.nombres = props.nombres;
    this.comunidad = props.comunidad;
    this.telefono = props.telefono ?? null;
  }

  static fromRow(row: ArtesanoRow): Artesano {
    return new Artesano({
      idArtesano: row.id_artesano,
      nombres: row.nombres,
      comunidad: row.comunidad,
      telefono: row.telefono,
    });
  }

  toRow(): Partial<ArtesanoRow> {
    return {
      ...(this.idArtesano !== null && { id_artesano: this.idArtesano }),
      nombres: this.nombres,
      comunidad: this.comunidad,
      telefono: this.telefono,
    };
  }
}
