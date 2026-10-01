import type { Pool, PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { pool } from '../config/database.ts';
import type { Paginacion } from '../utils/validation.ts';

// Permite usar el pool o una conexión dentro de una transacción
export type DbExecutor = Pool | PoolConnection;

export interface ModeloClase<TModel, TRow> {
  readonly tableName: string;
  readonly primaryKey: string;
  fromRow(row: TRow): TModel;
}

export interface Persistible<TRow> {
  toRow(): Partial<TRow>;
}

export interface OpcionesBusqueda<TRow> {
  where?: Partial<TRow>;
  paginacion?: Paginacion;
}

export class BaseRepository<TModel extends Persistible<TRow>, TRow extends object> {
  protected readonly modelo: ModeloClase<TModel, TRow>;
  protected readonly db: DbExecutor;

  constructor(modelo: ModeloClase<TModel, TRow>, db: DbExecutor = pool) {
    this.modelo = modelo;
    this.db = db;
  }

  protected aModelos(rows: RowDataPacket[]): TModel[] {
    return rows.map((row) => this.modelo.fromRow(row as unknown as TRow));
  }

  async findAll({ where = {}, paginacion = { limit: 50, offset: 0 } }: OpcionesBusqueda<TRow> = {}): Promise<TModel[]> {
    const condiciones = Object.entries(where).filter(([, valor]) => valor !== undefined);
    const whereSql = condiciones.length > 0 ? `WHERE ${condiciones.map(() => '?? = ?').join(' AND ')}` : '';

    const [rows] = await this.db.query<RowDataPacket[]>(
      `SELECT * FROM ?? ${whereSql} ORDER BY ?? LIMIT ? OFFSET ?`,
      [this.modelo.tableName, ...condiciones.flat(), this.modelo.primaryKey, paginacion.limit, paginacion.offset],
    );
    return this.aModelos(rows);
  }

  async findById(id: number): Promise<TModel | null> {
    const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM ?? WHERE ?? = ? LIMIT 1', [
      this.modelo.tableName,
      this.modelo.primaryKey,
      id,
    ]);
    return this.aModelos(rows)[0] ?? null;
  }

  async create(modelo: TModel): Promise<TModel> {
    const [resultado] = await this.db.query<ResultSetHeader>('INSERT INTO ?? SET ?', [
      this.modelo.tableName,
      modelo.toRow(),
    ]);
    const creado = await this.findById(resultado.insertId);
    if (!creado) throw new Error(`No se pudo leer el registro creado en ${this.modelo.tableName}`);
    return creado;
  }

  async update(id: number, modelo: TModel): Promise<TModel | null> {
    const { [this.modelo.primaryKey]: _id, ...cambios } = modelo.toRow() as Record<string, unknown>;
    const [resultado] = await this.db.query<ResultSetHeader>('UPDATE ?? SET ? WHERE ?? = ?', [
      this.modelo.tableName,
      cambios,
      this.modelo.primaryKey,
      id,
    ]);
    return resultado.affectedRows > 0 ? this.findById(id) : null;
  }

  async delete(id: number): Promise<boolean> {
    const [resultado] = await this.db.query<ResultSetHeader>('DELETE FROM ?? WHERE ?? = ?', [
      this.modelo.tableName,
      this.modelo.primaryKey,
      id,
    ]);
    return resultado.affectedRows > 0;
  }
}
