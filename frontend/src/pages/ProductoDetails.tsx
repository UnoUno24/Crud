import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


interface Producto {
  _id: string;
  name: string;
  category: string;
  description: string[];
  price: string;
  imagenUrl?: string;
}


const ProductoDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`/api/productos/${id}`);
        setProducto(response.data);
      } catch (err) {
        setError('Error al recuperar el producto. Por favor inténtalo de nuevo.');
      } finally {
        setLoading(false);
      }
    };


    fetchProducto();
  }, [id]);


  if (loading) {
    return <p>Loading producto details...</p>;
  }


  if (error) {
    return <p className="error">{error}</p>;
  }


  return (
    <div className="producto-details">
      {producto ? (
        <>
          <h1>{producto.name}</h1>
          <p><strong>Category:</strong> {producto.category}</p>
          {producto.imagenUrl && <img src={producto.imagenUrl} alt={producto.name} />}
          <h3>Description:</h3>
          <ul>
            {producto.description.map((description, index) => (
              <li key={index}>{description}</li>
            ))}
          </ul>
          <h3>Price:</h3>
          <p>{producto.price}</p>
        </>
      ) : (
        <p>No se encontró ningun producto</p>
      )}
    </div>
  );
};


export default ProductoDetails;