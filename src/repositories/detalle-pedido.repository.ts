import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { DetallePedido, type DetallePedidoRow } from '../models/index.ts';
import { pool } from '../config/database.ts';
import type { DbExecutor } from './base.repository.ts';

// detalle_pedidos tiene clave compuesta (id_pedido, id_producto), por eso no usa BaseRepository
export class DetallePedidoRepository {
  private readonly db: DbExecutor;

  constructor(db: DbExecutor = pool) {
    this.db = db;
  }

  private aModelos(rows: RowDataPacket[]): DetallePedido[] {
    return rows.map((row) => DetallePedido.fromRow(row as DetallePedidoRow));
  }

  async findByPedido(idPedido: number): Promise<DetallePedido[]> {
    const [rows] = await this.db.query<RowDataPacket[]>(
      'SELECT * FROM detalle_pedidos WHERE id_pedido = ? ORDER BY id_producto',
      [idPedido],
    );
    return this.aModelos(rows);
  }

  async findOne(idPedido: number, idProducto: number): Promise<DetallePedido | null> {
    const [rows] = await this.db.query<RowDataPacket[]>(
      'SELECT * FROM detalle_pedidos WHERE id_pedido = ? AND id_producto = ? LIMIT 1',
      [idPedido, idProducto],
    );
    return this.aModelos(rows)[0] ?? null;
  }

  async create(detalle: DetallePedido): Promise<DetallePedido> {
    await this.db.query('INSERT INTO detalle_pedidos SET ?', [detalle.toRow()]);
    return detalle;
  }

  async update(detalle: DetallePedido): Promise<DetallePedido | null> {
    const [resultado] = await this.db.query<ResultSetHeader>(
      'UPDATE detalle_pedidos SET cantidad = ?, precio_unitario = ? WHERE id_pedido = ? AND id_producto = ?',
      [detalle.cantidad, detalle.precioUnitario.toFixed(2), detalle.idPedido, detalle.idProducto],
    );
    return resultado.affectedRows > 0 ? this.findOne(detalle.idPedido, detalle.idProducto) : null;
  }

  async delete(idPedido: number, idProducto: number): Promise<boolean> {
    const [resultado] = await this.db.query<ResultSetHeader>(
      'DELETE FROM detalle_pedidos WHERE id_pedido = ? AND id_producto = ?',
      [idPedido, idProducto],
    );
    return resultado.affectedRows > 0;
  }
}
