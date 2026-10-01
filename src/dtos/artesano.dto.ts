import { v, type Parsed } from '../utils/validation.ts';

export const crearArtesanoSchema = {
  nombres: v.texto({ max: 100 }),
  comunidad: v.texto({ max: 100 }),
  telefono: v.nulable(v.texto({ max: 20 })),
};

export const filtroArtesanoSchema = {
  comunidad: v.texto({ max: 100, requerido: false }),
};

export type CrearArtesanoDto = Parsed<typeof crearArtesanoSchema>;
export type FiltroArtesanoDto = Parsed<typeof filtroArtesanoSchema>;
