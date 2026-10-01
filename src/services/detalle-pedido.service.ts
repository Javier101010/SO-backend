import { DetallePedido } from '../models/index.ts';
import { DetallePedidoRepository } from '../repositories/detalle-pedido.repository.ts';
import type { ActualizarDetallePedidoDto, CrearDetallePedidoDto } from '../dtos/detalle-pedido.dto.ts';
import { HttpError } from '../utils/http-error.ts';
import { pedidoService, type PedidoService } from './pedido.service.ts';

export class DetallePedidoService {
  private readonly repository: DetallePedidoRepository;
  private readonly pedidos: PedidoService;

  constructor(repository = new DetallePedidoRepository(), pedidos = pedidoService) {
    this.repository = repository;
    this.pedidos = pedidos;
  }

  private noEncontrado(idPedido: number, idProducto: number): HttpError {
    return new HttpError(404, `El pedido ${idPedido} no tiene el producto ${idProducto}`);
  }

  async listar(idPedido: number): Promise<DetallePedido[]> {
    // Lanza 404 si el pedido no existe
    await this.pedidos.obtener(idPedido);
    return this.repository.findByPedido(idPedido);
  }

  async obtener(idPedido: number, idProducto: number): Promise<DetallePedido> {
    const detalle = await this.repository.findOne(idPedido, idProducto);
    if (!detalle) throw this.noEncontrado(idPedido, idProducto);
    return detalle;
  }

  async crear(idPedido: number, dto: CrearDetallePedidoDto): Promise<DetallePedido> {
    await this.pedidos.obtener(idPedido);
    return this.repository.create(new DetallePedido({ idPedido, ...dto }));
  }

  async actualizar(idPedido: number, idProducto: number, cambios: ActualizarDetallePedidoDto): Promise<DetallePedido> {
    const detalle = await this.obtener(idPedido, idProducto);
    Object.assign(detalle, cambios);
    const actualizado = await this.repository.update(detalle);
    if (!actualizado) throw this.noEncontrado(idPedido, idProducto);
    return actualizado;
  }

  async eliminar(idPedido: number, idProducto: number): Promise<void> {
    const eliminado = await this.repository.delete(idPedido, idProducto);
    if (!eliminado) throw this.noEncontrado(idPedido, idProducto);
  }
}

export const detallePedidoService = new DetallePedidoService();
