import { HttpError } from './http-error.ts';

export interface Regla<T, R extends boolean = boolean> {
  readonly requerido: R;
  // desdeQuery: los valores de req.query llegan siempre como texto
  parse(valor: unknown, campo: string, desdeQuery: boolean): T;
}

export type Schema = Record<string, Regla<unknown>>;

type Simplificar<T> = { [K in keyof T]: T[K] } & {};
type TipoDe<R> = R extends Regla<infer T> ? T : never;
type Requeridos<S extends Schema> = {
  [K in keyof S]: S[K] extends Regla<unknown, true> ? K : never;
}[keyof S];

export type Parsed<S extends Schema> = Simplificar<
  { [K in Requeridos<S>]: TipoDe<S[K]> } & {
    [K in Exclude<keyof S, Requeridos<S>>]?: TipoDe<S[K]>;
  }
>;

const regla = <T, R extends boolean>(
  requerido: R,
  parse: Regla<T, R>['parse'],
): Regla<T, R> => ({ requerido, parse });

const aNumero = (valor: unknown, desdeQuery: boolean): unknown =>
  desdeQuery && typeof valor === 'string' && valor.trim() !== '' ? Number(valor) : valor;

const DECIMAL_10_2_MAX = 99_999_999.99;

export const v = {
  texto<R extends boolean = true>(opts: { max: number; min?: number; requerido?: R }) {
    return regla<string, R>((opts.requerido ?? true) as R, (valor, campo) => {
      if (typeof valor !== 'string') throw new Error(`${campo} debe ser texto`);
      const texto = valor.trim();
      const min = opts.min ?? 1;
      if (texto.length < min) {
        throw new Error(min === 1 ? `${campo} no puede estar vacío` : `${campo} debe tener al menos ${min} caracteres`);
      }
      if (texto.length > opts.max) throw new Error(`${campo} admite como máximo ${opts.max} caracteres`);
      return texto;
    });
  },

  email<R extends boolean = true>(opts: { max: number; requerido?: R }) {
    const base = v.texto({ max: opts.max });
    return regla<string, R>((opts.requerido ?? true) as R, (valor, campo, desdeQuery) => {
      const email = base.parse(valor, campo, desdeQuery).toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error(`${campo} no es un email válido`);
      return email;
    });
  },

  entero<R extends boolean = true>(opts: { min?: number; max?: number; requerido?: R } = {}) {
    return regla<number, R>((opts.requerido ?? true) as R, (valor, campo, desdeQuery) => {
      const numero = aNumero(valor, desdeQuery);
      if (typeof numero !== 'number' || !Number.isSafeInteger(numero)) {
        throw new Error(`${campo} debe ser un número entero`);
      }
      if (opts.min !== undefined && numero < opts.min) throw new Error(`${campo} debe ser mayor o igual a ${opts.min}`);
      if (opts.max !== undefined && numero > opts.max) throw new Error(`${campo} debe ser menor o igual a ${opts.max}`);
      return numero;
    });
  },

  id<R extends boolean = true>(opts: { requerido?: R } = {}) {
    return v.entero<R>({ ...opts, min: 1 });
  },

  // Equivalente a DECIMAL(10,2)
  decimal<R extends boolean = true>(opts: { min?: number; requerido?: R } = {}) {
    return regla<number, R>((opts.requerido ?? true) as R, (valor, campo, desdeQuery) => {
      const numero = aNumero(valor, desdeQuery);
      if (typeof numero !== 'number' || !Number.isFinite(numero)) {
        throw new Error(`${campo} debe ser un número`);
      }
      if (Math.abs(numero * 100 - Math.round(numero * 100)) > 1e-9) {
        throw new Error(`${campo} admite como máximo 2 decimales`);
      }
      const min = opts.min ?? 0;
      if (numero < min) throw new Error(`${campo} debe ser mayor o igual a ${min}`);
      if (numero > DECIMAL_10_2_MAX) throw new Error(`${campo} debe ser menor o igual a ${DECIMAL_10_2_MAX}`);
      return numero;
    });
  },

  enumerado<T extends string, R extends boolean = true>(valores: Record<string, T>, opts: { requerido?: R } = {}) {
    const permitidos = Object.values(valores);
    return regla<T, R>((opts.requerido ?? true) as R, (valor, campo) => {
      if (!permitidos.includes(valor as T)) {
        throw new Error(`${campo} debe ser uno de: ${permitidos.join(', ')}`);
      }
      return valor as T;
    });
  },

  // Campo opcional que además acepta null (columnas NULL en la BD)
  nulable<T>(base: Regla<T>) {
    return regla<T | null, false>(false, (valor, campo, desdeQuery) =>
      valor === null ? null : base.parse(valor, campo, desdeQuery),
    );
  },
};

interface OpcionesValidar {
  parcial?: boolean;
  desdeQuery?: boolean;
}

export function validar<S extends Schema>(datos: unknown, schema: S, opciones: OpcionesValidar & { parcial: true }): Partial<Parsed<S>>;
export function validar<S extends Schema>(datos: unknown, schema: S, opciones?: OpcionesValidar & { parcial?: false }): Parsed<S>;
export function validar<S extends Schema>(
  datos: unknown,
  schema: S,
  { parcial = false, desdeQuery = false }: OpcionesValidar = {},
): Partial<Parsed<S>> {
  if (typeof datos !== 'object' || datos === null || Array.isArray(datos)) {
    throw new HttpError(400, 'El cuerpo de la petición debe ser un objeto JSON');
  }

  const entrada = datos as Record<string, unknown>;
  const resultado: Record<string, unknown> = {};
  const errores: string[] = [];

  for (const [campo, regla] of Object.entries(schema)) {
    const valor = entrada[campo];
    if (valor === undefined) {
      if (regla.requerido && !parcial) errores.push(`${campo} es obligatorio`);
      continue;
    }
    try {
      resultado[campo] = regla.parse(valor, campo, desdeQuery);
    } catch (error) {
      errores.push(error instanceof Error ? error.message : String(error));
    }
  }

  if (errores.length > 0) throw new HttpError(400, 'Datos inválidos', errores);
  if (parcial && !desdeQuery && Object.keys(resultado).length === 0) {
    throw new HttpError(400, 'Debe enviar al menos un campo para actualizar');
  }
  return resultado as Partial<Parsed<S>>;
}

export const parseId = (valor: unknown, campo = 'id'): number => {
  if (typeof valor !== 'string' || !/^\d+$/.test(valor) || Number(valor) < 1) {
    throw new HttpError(400, `${campo} debe ser un número entero positivo`);
  }
  return Number(valor);
};

export interface Paginacion {
  limit: number;
  offset: number;
}

const paginacionSchema = {
  limit: v.entero({ min: 1, max: 100, requerido: false }),
  offset: v.entero({ min: 0, requerido: false }),
};

export const parsePaginacion = (query: unknown): Paginacion => {
  const { limit = 50, offset = 0 } = validar(query, paginacionSchema, { parcial: true, desdeQuery: true });
  return { limit, offset };
};
