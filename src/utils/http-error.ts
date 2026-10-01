export class HttpError extends Error {
  readonly status: number;
  readonly detalles: string[] | undefined;

  constructor(status: number, message: string, detalles?: string[]) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.detalles = detalles;
  }
}
