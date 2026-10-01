import { crearPagoSchema, filtroPagoSchema } from '../dtos/pago.dto.ts';
import { pagoService } from '../services/pago.service.ts';
import { CrudController } from './crud.controller.ts';

export const pagoController = new CrudController(pagoService, {
  crear: crearPagoSchema,
  filtros: filtroPagoSchema,
});
