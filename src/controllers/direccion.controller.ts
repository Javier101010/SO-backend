import { crearDireccionSchema, filtroDireccionSchema } from '../dtos/direccion.dto.ts';
import { direccionService } from '../services/direccion.service.ts';
import { CrudController } from './crud.controller.ts';

export const direccionController = new CrudController(direccionService, {
  crear: crearDireccionSchema,
  filtros: filtroDireccionSchema,
});
