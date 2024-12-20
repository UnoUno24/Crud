// EditProducto.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Cambié useHistory por useNavigate
import axios from 'axios';

interface Producto {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  imagenUrl?: string;
}

const EditProducto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();  // Cambié history por navigate
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Obtener los detalles del producto
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/productos/${id}`);
        setProducto(response.data);
      } catch (err) {
        setError('Error al recuperar el producto. Por favor inténtalo de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (producto) {
      setProducto({
        ...producto,
        [name]: value,
      });
    }
  };

  // Función para manejar el envío del formulario (actualizar el producto)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/productos/${id}`, producto);
      navigate('/');  // Usé navigate para redirigir al catálogo después de actualizar
    } catch (err) {
      setError('Error al actualizar el producto.');
    }
  };

  if (loading) {
    return <p>Loading producto...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="edit-producto">
      <h1>Editar Producto</h1>
      {producto ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input type="text" name="name" value={producto.name} onChange={handleChange}/>
          </div>
          <div>
            <label>Category</label>
            <input type="text" name="category" value={producto.category} onChange={handleChange}/>
          </div>
          <div>
            <label>Description</label>
            <textarea name="description" value={producto.description} onChange={handleChange}/>
          </div>
          <div>
            <label>Price</label>
            <input type="text" name="price" value={producto.price} onChange={handleChange}/>
          </div>
          <div>
            <label>Image URL</label>
            <input type="text" name="imagenUrl" value={producto.imagenUrl || ''} onChange={handleChange}/>
          </div>
          <button type="submit">Guardar cambios</button>
        </form>
      ) : (
        <p>No se encontró el producto.</p>
      )}
    </div>
  );
};

export default EditProducto;


