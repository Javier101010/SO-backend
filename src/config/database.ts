import mysql from 'mysql2/promise';
import { env } from './env.ts';

export const pool = mysql.createPool({
  ...env.db,
  waitForConnections: true,
  queueLimit: 0,
});

export const verificarConexion = async (): Promise<void> => {
  const conexion = await pool.getConnection();
  try {
    await conexion.ping();
  } finally {
    conexion.release();
  }
};
