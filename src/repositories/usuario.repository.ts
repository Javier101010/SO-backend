import type { RowDataPacket } from 'mysql2/promise';
import { Usuario, type UsuarioRow } from '../models/index.ts';
import { pool } from '../config/database.ts';
import { BaseRepository, type DbExecutor } from './base.repository.ts';

export class UsuarioRepository extends BaseRepository<Usuario, UsuarioRow> {
  constructor(db: DbExecutor = pool) {
    super(Usuario, db);
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM usuarios WHERE email = ? LIMIT 1', [email]);
    return this.aModelos(rows)[0] ?? null;
  }
}
