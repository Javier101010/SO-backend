import { Rol, type RolRow } from '../models/index.ts';
import { RolRepository } from '../repositories/rol.repository.ts';
import type { CrearRolDto } from '../dtos/rol.dto.ts';
import { CrudService } from './crud.service.ts';

export class RolService extends CrudService<Rol, RolRow, CrearRolDto> {
  constructor(repository = new RolRepository()) {
    super(repository, 'El rol');
  }

  protected construir(dto: CrearRolDto): Rol {
    return new Rol(dto);
  }
}

export const rolService = new RolService();
