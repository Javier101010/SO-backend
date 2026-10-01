import { Router } from 'express';
import { detallePedidoController } from '../controllers/detalle-pedido.controller.ts';

// mergeParams permite leer :idPedido definido en la ruta padre
const router = Router({ mergeParams: true });

router.get('/', detallePedidoController.listar);
router.get('/:idProducto', detallePedidoController.obtener);
router.post('/', detallePedidoController.crear);
router.patch('/:idProducto', detallePedidoController.actualizar);
router.delete('/:idProducto', detallePedidoController.eliminar);

export default router;
