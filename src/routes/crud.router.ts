import { Router } from 'express';
import type { CrudController } from '../controllers/crud.controller.ts';
import type { Schema } from '../utils/validation.ts';

export const crudRouter = <S extends Schema, F extends Schema>(controller: CrudController<S, F>): Router => {
  const router = Router();
  router.get('/', controller.listar);
  router.get('/:id', controller.obtener);
  router.post('/', controller.crear);
  router.patch('/:id', controller.actualizar);
  router.delete('/:id', controller.eliminar);
  return router;
};
