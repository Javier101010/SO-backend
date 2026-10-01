import app from './app.ts';
import { env } from './config/env.ts';
import { pool, verificarConexion } from './config/database.ts';

try {
  await verificarConexion();
  console.log(`Conectado a MySQL (${env.db.host}:${env.db.port}/${env.db.database})`);
} catch (error) {
  console.error('No se pudo conectar a MySQL:', error instanceof Error ? error.message : error);
  process.exit(1);
}

const server = app.listen(env.port, () => {
  console.log(`Servicio-tiendaVirtual escuchando en http://localhost:${env.port}`);
});

const cerrar = (senal: string): void => {
  console.log(`${senal} recibido, cerrando servidor...`);
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
};

process.on('SIGINT', cerrar);
process.on('SIGTERM', cerrar);
