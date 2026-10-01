import express from 'express';
import routes from './routes/index.ts';
import { notFound, errorHandler } from './middlewares/error.middleware.ts';

const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
