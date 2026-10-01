import { Usuario, type UsuarioRow } from '../models/index.ts';
import { UsuarioRepository } from '../repositories/usuario.repository.ts';
import type { CrearUsuarioDto, FiltroUsuarioDto } from '../dtos/usuario.dto.ts';
import { hashPassword } from '../utils/password.ts';
import { CrudService } from './crud.service.ts';

export class UsuarioService extends CrudService<Usuario, UsuarioRow, CrearUsuarioDto, FiltroUsuarioDto> {
  constructor(repository = new UsuarioRepository()) {
    super(repository, 'El usuario');
  }

  protected async construir({ password, ...datos }: CrearUsuarioDto): Promise<Usuario> {
    return new Usuario({ ...datos, passwordHash: await hashPassword(password) });
  }

  protected override async aplicarCambios(
    usuario: Usuario,
    { password, ...cambios }: Partial<CrearUsuarioDto>,
  ): Promise<void> {
    Object.assign(usuario, cambios);
    if (password !== undefined) usuario.passwordHash = await hashPassword(password);
  }

  protected override aWhere(filtro: FiltroUsuarioDto): Partial<UsuarioRow> {
    return { ...(filtro.idRol !== undefined && { id_rol: filtro.idRol }) };
  }
}

export const usuarioService = new UsuarioService();
