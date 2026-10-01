import { Rol, type RolRow } from '../models/index.ts';
import { pool } from '../config/database.ts';
import { BaseRepository, type DbExecutor } from './base.repository.ts';

export class RolRepository extends BaseRepository<Rol, RolRow> {
  constructor(db: DbExecutor = pool) {
    super(Rol, db);
  }
}
