import { crearCarritoSchema, filtroCarritoSchema } from '../dtos/carrito.dto.ts';
import { carritoService } from '../services/carrito.service.ts';
import { CrudController } from './crud.controller.ts';

export const carritoController = new CrudController(carritoService, {
  crear: crearCarritoSchema,
  filtros: filtroCarritoSchema,
});
