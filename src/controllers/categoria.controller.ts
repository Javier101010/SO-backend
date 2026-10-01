import { crearCategoriaSchema } from '../dtos/categoria.dto.ts';
import { categoriaService } from '../services/categoria.service.ts';
import { CrudController } from './crud.controller.ts';

export const categoriaController = new CrudController(categoriaService, {
  crear: crearCategoriaSchema,
});
