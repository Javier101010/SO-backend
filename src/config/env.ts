const requerida = (nombre: string): string => {
  const valor = process.env[nombre];
  if (valor === undefined || valor === '') {
    throw new Error(`Falta la variable de entorno ${nombre}`);
  }
  return valor;
};

export const env = {
  port: Number(process.env.PORT ?? 3000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  db: {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 3306),
    user: requerida('DB_USER'),
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME ?? 'tienda_artesanal',
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT ?? 10),
  },
} as const;

export const esProduccion = env.nodeEnv === 'production';
