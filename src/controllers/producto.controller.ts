import { crearProductoSchema, filtroProductoSchema } from '../dtos/producto.dto.ts';
import { productoService } from '../services/producto.service.ts';
import { CrudController } from './crud.controller.ts';

export const productoController = new CrudController(productoService, {
  crear: crearProductoSchema,
  filtros: filtroProductoSchema,
});
