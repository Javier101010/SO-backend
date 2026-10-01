import { v, type Parsed } from '../utils/validation.ts';

export const crearCategoriaSchema = {
  nombre: v.texto({ max: 50 }),
  descripcion: v.nulable(v.texto({ max: 65_535 })),
};

export type CrearCategoriaDto = Parsed<typeof crearCategoriaSchema>;
