import { Direccion, type DireccionRow } from '../models/index.ts';
import { pool } from '../config/database.ts';
import { BaseRepository, type DbExecutor } from './base.repository.ts';

export class DireccionRepository extends BaseRepository<Direccion, DireccionRow> {
  constructor(db: DbExecutor = pool) {
    super(Direccion, db);
  }
}
