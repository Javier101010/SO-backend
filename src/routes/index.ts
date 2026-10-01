import { Router } from 'express';
import healthRoutes from './health.routes.ts';
import detallePedidoRoutes from './detalle-pedido.routes.ts';
import { crudRouter } from './crud.router.ts';
import { rolController } from '../controllers/rol.controller.ts';
import { artesanoController } from '../controllers/artesano.controller.ts';
import { categoriaController } from '../controllers/categoria.controller.ts';
import { usuarioController } from '../controllers/usuario.controller.ts';
import { productoController } from '../controllers/producto.controller.ts';
import { direccionController } from '../controllers/direccion.controller.ts';
import { carritoController } from '../controllers/carrito.controller.ts';
import { pedidoController } from '../controllers/pedido.controller.ts';
import { pagoController } from '../controllers/pago.controller.ts';

const router = Router();

router.use('/health', healthRoutes);
router.use('/roles', crudRouter(rolController));
router.use('/artesanos', crudRouter(artesanoController));
router.use('/categorias', crudRouter(categoriaController));
router.use('/usuarios', crudRouter(usuarioController));
router.use('/productos', crudRouter(productoController));
router.use('/direcciones', crudRouter(direccionController));
router.use('/carrito', crudRouter(carritoController));
router.use('/pedidos/:idPedido/detalles', detallePedidoRoutes);
router.use('/pedidos', crudRouter(pedidoController));
router.use('/pagos', crudRouter(pagoController));

export default router;
