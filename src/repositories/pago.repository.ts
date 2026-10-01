import { Pago, type PagoRow } from '../models/index.ts';
import { pool } from '../config/database.ts';
import { BaseRepository, type DbExecutor } from './base.repository.ts';

export class PagoRepository extends BaseRepository<Pago, PagoRow> {
  constructor(db: DbExecutor = pool) {
    super(Pago, db);
  }
}
