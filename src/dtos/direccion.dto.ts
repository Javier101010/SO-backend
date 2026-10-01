import { v, type Parsed } from '../utils/validation.ts';

export const crearDireccionSchema = {
  idUsuario: v.id(),
  direccionLinea: v.texto({ max: 255 }),
  ciudad: v.texto({ max: 100 }),
  departamento: v.texto({ max: 100 }),
  codigoPostal: v.nulable(v.texto({ max: 10 })),
};

export const filtroDireccionSchema = {
  idUsuario: v.id({ requerido: false }),
};

export type CrearDireccionDto = Parsed<typeof crearDireccionSchema>;
export type FiltroDireccionDto = Parsed<typeof filtroDireccionSchema>;
