import { Artesano, type ArtesanoRow } from '../models/index.ts';
import { pool } from '../config/database.ts';
import { BaseRepository, type DbExecutor } from './base.repository.ts';

export class ArtesanoRepository extends BaseRepository<Artesano, ArtesanoRow> {
  constructor(db: DbExecutor = pool) {
    super(Artesano, db);
  }
}
