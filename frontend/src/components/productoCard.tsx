import React from 'react';
import { Link } from 'react-router-dom'; // Importación de Link
import 'font-awesome/css/font-awesome.min.css'; // Asegúrate de importar FontAwesome

interface ProductoCardProps {
  producto: {
    _id: string;
    name: string;
    category: string;
    description: string;
    price: string;
    imagenUrl?: string;
  };
  onDelete: (id: string) => void;  // Nueva prop para manejar la eliminación
}

const ProductoCard: React.FC<ProductoCardProps> = ({ producto, onDelete }) => {
  return (
    <div className="producto-card">
      <img src={producto.imagenUrl || 'default-image.jpg'} alt={producto.name} />
      <h3>{producto.name}</h3>
      <p><strong>Categoria:</strong> {producto.category}</p>
      <p>{producto.description}</p>
      <p>{producto.price}</p>
      
      {/* Botón de eliminar con icono */}
      <button className="eliminar" onClick={() => onDelete(producto._id)}>
        <i className="fa fa-trash"></i> {/* Icono de basura */}
      </button> 

      {/* Botón de editar con icono */}
      <Link to={`/editar-producto/${producto._id}`}>
        <button className="editar">
          <i className="fa fa-pencil"></i> {/* Icono de lápiz */}
        </button>
      </Link>
    </div>
  );
};

export default ProductoCard;




