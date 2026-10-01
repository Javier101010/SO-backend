import type { Request, Response } from 'express';
import type { CrudOperaciones } from '../services/crud.service.ts';
import { parseId, parsePaginacion, validar, type Parsed, type Schema } from '../utils/validation.ts';

interface SchemasCrud<S extends Schema, F extends Schema> {
  crear: S;
  filtros?: F;
}

// Controlador genérico: valida la petición y delega en el servicio
export class CrudController<S extends Schema, F extends Schema = Record<never, never>> {
  private readonly service: CrudOperaciones<Parsed<S>, Parsed<F>>;
  private readonly schemas: SchemasCrud<S, F>;

  constructor(service: CrudOperaciones<Parsed<S>, Parsed<F>>, schemas: SchemasCrud<S, F>) {
    this.service = service;
    this.schemas = schemas;
  }

  listar = async (req: Request, res: Response): Promise<void> => {
    const filtro = this.schemas.filtros
      ? validar(req.query, this.schemas.filtros, { parcial: true, desdeQuery: true })
      : {};
    res.json(await this.service.listar(filtro as Parsed<F>, parsePaginacion(req.query)));
  };

  obtener = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.service.obtener(parseId(req.params.id)));
  };

  crear = async (req: Request, res: Response): Promise<void> => {
    const dto = validar(req.body, this.schemas.crear);
    res.status(201).json(await this.service.crear(dto));
  };

  actualizar = async (req: Request, res: Response): Promise<void> => {
    const id = parseId(req.params.id);
    const cambios = validar(req.body, this.schemas.crear, { parcial: true });
    res.json(await this.service.actualizar(id, cambios));
  };

  eliminar = async (req: Request, res: Response): Promise<void> => {
    await this.service.eliminar(parseId(req.params.id));
    res.status(204).end();
  };
}
