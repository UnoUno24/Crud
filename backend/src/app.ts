import express from 'express';
import cors from 'cors';
import productoRoutes from './routes/productoRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/productos', productoRoutes);

export default app;