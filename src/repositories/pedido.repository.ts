import { Pedido, type PedidoRow } from '../models/index.ts';
import { pool } from '../config/database.ts';
import { BaseRepository, type DbExecutor } from './base.repository.ts';

export class PedidoRepository extends BaseRepository<Pedido, PedidoRow> {
  constructor(db: DbExecutor = pool) {
    super(Pedido, db);
  }
}
