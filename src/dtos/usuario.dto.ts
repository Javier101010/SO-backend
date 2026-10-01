import { v, type Parsed } from '../utils/validation.ts';

export const crearUsuarioSchema = {
  idRol: v.id(),
  email: v.email({ max: 120 }),
  // Se recibe en texto plano y el servicio guarda solo el hash
  password: v.texto({ min: 8, max: 128 }),
  nombreCompleto: v.texto({ max: 120 }),
  telefono: v.nulable(v.texto({ max: 20 })),
};

export const filtroUsuarioSchema = {
  idRol: v.id({ requerido: false }),
};

export type CrearUsuarioDto = Parsed<typeof crearUsuarioSchema>;
export type FiltroUsuarioDto = Parsed<typeof filtroUsuarioSchema>;
