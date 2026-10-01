import { Artesano, type ArtesanoRow } from '../models/index.ts';
import { ArtesanoRepository } from '../repositories/artesano.repository.ts';
import type { CrearArtesanoDto, FiltroArtesanoDto } from '../dtos/artesano.dto.ts';
import { CrudService } from './crud.service.ts';

export class ArtesanoService extends CrudService<Artesano, ArtesanoRow, CrearArtesanoDto, FiltroArtesanoDto> {
  constructor(repository = new ArtesanoRepository()) {
    super(repository, 'El artesano');
  }

  protected construir(dto: CrearArtesanoDto): Artesano {
    return new Artesano(dto);
  }

  protected override aWhere(filtro: FiltroArtesanoDto): Partial<ArtesanoRow> {
    return { ...(filtro.comunidad !== undefined && { comunidad: filtro.comunidad }) };
  }
}

export const artesanoService = new ArtesanoService();
