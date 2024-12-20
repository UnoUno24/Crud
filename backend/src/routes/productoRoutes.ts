import { Router } from 'express';
import { addProducto, getAllProductos, getProductoById, updateProducto, deleteProducto } from '../controllers/productoController';

const router = Router();

router.get('/productos', getAllProductos);
router.post('/', addProducto);
router.get('/:id', getProductoById);
router.put('/:id', updateProducto)
router.delete('/:id', deleteProducto);

export default router;