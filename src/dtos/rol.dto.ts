import { v, type Parsed } from '../utils/validation.ts';

export const crearRolSchema = {
  nombre: v.texto({ max: 50 }),
};

export type CrearRolDto = Parsed<typeof crearRolSchema>;
