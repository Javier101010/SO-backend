import type { NextFunction, Request, Response } from 'express';
import { esProduccion } from '../config/env.ts';
import { HttpError } from '../utils/http-error.ts';

// Errores de MySQL que corresponden a errores del cliente
const ERRORES_MYSQL: Record<string, { status: number; message: string }> = {
  ER_DUP_ENTRY: { status: 409, message: 'Ya existe un registro con ese valor único' },
  ER_NO_REFERENCED_ROW_2: { status: 400, message: 'Hace referencia a un registro que no existe' },
  ER_ROW_IS_REFERENCED_2: { status: 409, message: 'No se puede eliminar: otros registros dependen de este' },
};

const tieneCodigo = (err: unknown): err is { code: string } =>
  typeof err === 'object' && err !== null && typeof (err as { code?: unknown }).code === 'string';

// Errores de express.json() (JSON mal formado, cuerpo demasiado grande, etc.)
const esErrorDeCliente = (err: unknown): err is { status: number; message: string; expose: true } =>
  typeof err === 'object' && err !== null && (err as { expose?: unknown }).expose === true;

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({ message: `Ruta no encontrada: ${req.originalUrl}` });
};

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ message: err.message, ...(err.detalles && { detalles: err.detalles }) });
    return;
  }

  const errorMysql = tieneCodigo(err) ? ERRORES_MYSQL[err.code] : undefined;
  if (errorMysql) {
    res.status(errorMysql.status).json({ message: errorMysql.message });
    return;
  }

  if (esErrorDeCliente(err)) {
    res.status(err.status).json({ message: err.message });
    return;
  }

  console.error(err);
  // En producción no se exponen detalles internos (SQL, rutas, etc.)
  const message = !esProduccion && err instanceof Error ? err.message : 'Error interno del servidor';
  res.status(500).json({ message });
};
