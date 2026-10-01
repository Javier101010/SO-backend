import { crearArtesanoSchema, filtroArtesanoSchema } from '../dtos/artesano.dto.ts';
import { artesanoService } from '../services/artesano.service.ts';
import { CrudController } from './crud.controller.ts';

export const artesanoController = new CrudController(artesanoService, {
  crear: crearArtesanoSchema,
  filtros: filtroArtesanoSchema,
});
