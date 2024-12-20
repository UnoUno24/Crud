import { Request, Response } from 'express';
import Producto from '../models/Producto';

// Obtener todos los productos
export const getAllProductos = async (req: Request, res: Response): Promise<void> => {
    try {
        const productos = await Producto.find();
        res.status(200).json({ success: true, data: productos }); // Respuesta consistente
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Ha ocurrido un error';
        res.status(500).json({ success: false, error: errorMessage }); // Mensaje de error coherente
    }
};

export const getProductoById = async (req: Request, res: Response): Promise<void> => {
    try{
        const producto = await Producto.findById(req.params.id);
        if(!producto){
            res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    }catch(error){
        const errorMessage = error instanceof Error ? error.message : 'Ha ocurrido un error';
        res.status(500).json({ error: errorMessage });
    }
};

// Agregar un nuevo producto
export const addProducto = async (req: Request, res: Response): Promise<void> => {
    try {
        const newProducto = new Producto(req.body);
        await newProducto.save();
        res.status(201).json({ success: true, data: newProducto }); // Respuesta consistente con éxito
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Ha ocurrido un error';
        res.status(500).json({ success: false, error: errorMessage }); // Manejo de errores coherente
    }
};

// Modificar un producto existente
export const updateProducto = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; // Obtener el ID del producto desde los parámetros de la URL
        const updatedData = req.body; // Los datos del producto a modificar

        const producto = await Producto.findByIdAndUpdate(id, updatedData, { new: true }); // Actualizar el producto

        if (!producto) {
            res.status(404).json({ success: false, error: 'Producto no encontrado' }); // Respuesta consistente de error
            return;
        }

        res.status(200).json({ success: true, data: producto }); // Respuesta consistente con éxito
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Ha ocurrido un error';
        res.status(500).json({ success: false, error: errorMessage }); // Manejo de errores coherente
    }
};

// Eliminar un producto
export const deleteProducto = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; // Obtener el ID del producto desde los parámetros de la URL
        const producto = await Producto.findByIdAndDelete(id); // Buscar y eliminar el producto por ID

        if (!producto) {
            res.status(404).json({ success: false, error: 'Producto no encontrado' }); // Respuesta coherente de error
            return;
        }

        res.status(200).json({ success: true, message: 'Producto eliminado exitosamente' }); // Respuesta exitosa
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Ha ocurrido un error';
        res.status(500).json({ success: false, error: errorMessage }); // Manejo de errores coherente
    }
};

