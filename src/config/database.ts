import mysql from 'mysql2/promise';
import { env } from './env.ts';

export const pool = mysql.createPool({
  ...env.db,
  waitForConnections: true,
  queueLimit: 0,
  // Azure corta conexiones TCP inactivas (~4 min); keep-alive y cierre de inactivas lo evitan
  enableKeepAlive: true,
  keepAliveInitialDelay: 10_000,
  maxIdle: 2,
  idleTimeout: 60_000,
});

export const verificarConexion = async (): Promise<void> => {
  const conexion = await pool.getConnection();
  try {
    await conexion.ping();
  } finally {
    conexion.release();
  }
};
