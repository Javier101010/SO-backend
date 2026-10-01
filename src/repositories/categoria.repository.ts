import { Categoria, type CategoriaRow } from '../models/index.ts';
import { pool } from '../config/database.ts';
import { BaseRepository, type DbExecutor } from './base.repository.ts';

export class CategoriaRepository extends BaseRepository<Categoria, CategoriaRow> {
  constructor(db: DbExecutor = pool) {
    super(Categoria, db);
  }
}
