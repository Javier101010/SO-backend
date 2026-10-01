import { Direccion, type DireccionRow } from '../models/index.ts';
import { DireccionRepository } from '../repositories/direccion.repository.ts';
import type { CrearDireccionDto, FiltroDireccionDto } from '../dtos/direccion.dto.ts';
import { CrudService } from './crud.service.ts';

export class DireccionService extends CrudService<Direccion, DireccionRow, CrearDireccionDto, FiltroDireccionDto> {
  constructor(repository = new DireccionRepository()) {
    super(repository, 'La dirección');
  }

  protected construir(dto: CrearDireccionDto): Direccion {
    return new Direccion(dto);
  }

  protected override aWhere(filtro: FiltroDireccionDto): Partial<DireccionRow> {
    return { ...(filtro.idUsuario !== undefined && { id_usuario: filtro.idUsuario }) };
  }
}

export const direccionService = new DireccionService();
