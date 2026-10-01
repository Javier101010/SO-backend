import { Carrito, type CarritoRow } from '../models/index.ts';
import { pool } from '../config/database.ts';
import { BaseRepository, type DbExecutor } from './base.repository.ts';

export class CarritoRepository extends BaseRepository<Carrito, CarritoRow> {
  constructor(db: DbExecutor = pool) {
    super(Carrito, db);
  }
}
