import type { Request, Response } from 'express';
import { actualizarDetallePedidoSchema, crearDetallePedidoSchema } from '../dtos/detalle-pedido.dto.ts';
import { detallePedidoService } from '../services/detalle-pedido.service.ts';
import { parseId, validar } from '../utils/validation.ts';

// Rutas anidadas: /api/pedidos/:idPedido/detalles
export const detallePedidoController = {
  listar: async (req: Request, res: Response): Promise<void> => {
    res.json(await detallePedidoService.listar(parseId(req.params.idPedido, 'idPedido')));
  },

  obtener: async (req: Request, res: Response): Promise<void> => {
    res.json(
      await detallePedidoService.obtener(
        parseId(req.params.idPedido, 'idPedido'),
        parseId(req.params.idProducto, 'idProducto'),
      ),
    );
  },

  crear: async (req: Request, res: Response): Promise<void> => {
    const idPedido = parseId(req.params.idPedido, 'idPedido');
    const dto = validar(req.body, crearDetallePedidoSchema);
    res.status(201).json(await detallePedidoService.crear(idPedido, dto));
  },

  actualizar: async (req: Request, res: Response): Promise<void> => {
    const idPedido = parseId(req.params.idPedido, 'idPedido');
    const idProducto = parseId(req.params.idProducto, 'idProducto');
    const cambios = validar(req.body, actualizarDetallePedidoSchema, { parcial: true });
    res.json(await detallePedidoService.actualizar(idPedido, idProducto, cambios));
  },

  eliminar: async (req: Request, res: Response): Promise<void> => {
    await detallePedidoService.eliminar(
      parseId(req.params.idPedido, 'idPedido'),
      parseId(req.params.idProducto, 'idProducto'),
    );
    res.status(204).end();
  },
};
