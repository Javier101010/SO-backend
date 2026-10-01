import type { BaseRepository, Persistible } from '../repositories/base.repository.ts';
import { HttpError } from '../utils/http-error.ts';
import type { Paginacion } from '../utils/validation.ts';

export interface CrudOperaciones<TCreate, TFiltro> {
  listar(filtro: TFiltro, paginacion: Paginacion): Promise<unknown[]>;
  obtener(id: number): Promise<unknown>;
  crear(dto: TCreate): Promise<unknown>;
  actualizar(id: number, cambios: Partial<TCreate>): Promise<unknown>;
  eliminar(id: number): Promise<void>;
}

export abstract class CrudService<
  TModel extends Persistible<TRow>,
  TRow extends object,
  TCreate extends object,
  TFiltro extends object = Record<never, never>,
> implements CrudOperaciones<TCreate, TFiltro> {
  protected readonly repository: BaseRepository<TModel, TRow>;
  // Se usa en los mensajes de error, p. ej. "El producto", "La categoría"
  protected readonly recurso: string;

  constructor(repository: BaseRepository<TModel, TRow>, recurso: string) {
    this.repository = repository;
    this.recurso = recurso;
  }

  protected abstract construir(dto: TCreate): TModel | Promise<TModel>;

  protected aplicarCambios(modelo: TModel, cambios: Partial<TCreate>): void | Promise<void> {
    Object.assign(modelo, cambios);
  }

  // Convierte el filtro de la API (camelCase) a columnas de la tabla
  protected aWhere(_filtro: TFiltro): Partial<TRow> {
    return {};
  }

  protected noEncontrado(id: number): HttpError {
    return new HttpError(404, `${this.recurso} con id ${id} no existe`);
  }

  listar(filtro: TFiltro, paginacion: Paginacion): Promise<TModel[]> {
    return this.repository.findAll({ where: this.aWhere(filtro), paginacion });
  }

  async obtener(id: number): Promise<TModel> {
    const modelo = await this.repository.findById(id);
    if (!modelo) throw this.noEncontrado(id);
    return modelo;
  }

  async crear(dto: TCreate): Promise<TModel> {
    return this.repository.create(await this.construir(dto));
  }

  async actualizar(id: number, cambios: Partial<TCreate>): Promise<TModel> {
    const modelo = await this.obtener(id);
    await this.aplicarCambios(modelo, cambios);
    const actualizado = await this.repository.update(id, modelo);
    if (!actualizado) throw this.noEncontrado(id);
    return actualizado;
  }

  async eliminar(id: number): Promise<void> {
    const eliminado = await this.repository.delete(id);
    if (!eliminado) throw this.noEncontrado(id);
  }
}
