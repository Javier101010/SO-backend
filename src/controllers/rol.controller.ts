import { crearRolSchema } from '../dtos/rol.dto.ts';
import { rolService } from '../services/rol.service.ts';
import { CrudController } from './crud.controller.ts';

export const rolController = new CrudController(rolService, {
  crear: crearRolSchema,
});
