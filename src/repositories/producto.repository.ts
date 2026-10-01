import { Producto, type ProductoRow } from '../models/index.ts';
import { pool } from '../config/database.ts';
import { BaseRepository, type DbExecutor } from './base.repository.ts';

export class ProductoRepository extends BaseRepository<Producto, ProductoRow> {
  constructor(db: DbExecutor = pool) {
    super(Producto, db);
  }
}
