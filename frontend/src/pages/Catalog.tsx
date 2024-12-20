import React from 'react';
import ProductoCard from '../components/productoCard';
import useFetchProductos from '../hooks/useFetchProductos';
import apiClient from '../utils/api';

const Catalog: React.FC = () => {
  const { productos, loading, refetchProductos } = useFetchProductos();  // Refetching para actualizar la lista de productos

  const handleDelete = async (id: string) => {
    try {
      // Hacer la solicitud DELETE al backend
      await apiClient.delete(`http://localhost:5000/api/productos/${id}`);
      // Volver a obtener la lista de productos actualizada
      refetchProductos();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  if (loading) return <p>Loading productos...</p>;

  return (
    <div className="catalog">
      {productos.map((producto) => (
        <ProductoCard key={producto._id} producto={producto} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default Catalog;
