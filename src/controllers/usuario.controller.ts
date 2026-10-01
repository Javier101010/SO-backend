import { crearUsuarioSchema, filtroUsuarioSchema } from '../dtos/usuario.dto.ts';
import { usuarioService } from '../services/usuario.service.ts';
import { CrudController } from './crud.controller.ts';

export const usuarioController = new CrudController(usuarioService, {
  crear: crearUsuarioSchema,
  filtros: filtroUsuarioSchema,
});
