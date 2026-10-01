import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback) as (
  password: string,
  salt: Buffer,
  keylen: number,
) => Promise<Buffer>;

const LONGITUD_CLAVE = 64;

// Formato almacenado: scrypt$<salt base64>$<hash base64>
export const hashPassword = async (password: string): Promise<string> => {
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, LONGITUD_CLAVE);
  return `scrypt$${salt.toString('base64')}$${hash.toString('base64')}`;
};

export const verificarPassword = async (password: string, almacenado: string): Promise<boolean> => {
  const [algoritmo, salt, hash] = almacenado.split('$');
  if (algoritmo !== 'scrypt' || !salt || !hash) return false;

  const esperado = Buffer.from(hash, 'base64');
  const calculado = await scrypt(password, Buffer.from(salt, 'base64'), esperado.length);
  return timingSafeEqual(esperado, calculado);
};
