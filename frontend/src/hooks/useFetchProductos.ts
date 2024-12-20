import { useState, useEffect } from 'react';
import apiClient from '../utils/api';

interface Producto {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  imagenUrl?: string;
}

const useFetchProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Función para obtener productos
  const fetchProductos = async () => {
    try {
      const response = await apiClient.get('http://localhost:5000/api/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al buscar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // Función para volver a obtener los productos
  const refetchProductos = async () => {
    setLoading(true);
    await fetchProductos();
  };

  return { productos, loading, refetchProductos };
};

export default useFetchProductos;
