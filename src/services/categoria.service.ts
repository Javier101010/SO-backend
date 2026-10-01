import { Categoria, type CategoriaRow } from '../models/index.ts';
import { CategoriaRepository } from '../repositories/categoria.repository.ts';
import type { CrearCategoriaDto } from '../dtos/categoria.dto.ts';
import { CrudService } from './crud.service.ts';

export class CategoriaService extends CrudService<Categoria, CategoriaRow, CrearCategoriaDto> {
  constructor(repository = new CategoriaRepository()) {
    super(repository, 'La categoría');
  }

  protected construir(dto: CrearCategoriaDto): Categoria {
    return new Categoria(dto);
  }
}

export const categoriaService = new CategoriaService();
