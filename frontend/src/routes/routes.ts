// routes.ts
import Catalog from '../pages/Catalog';
import AddProducto from '../pages/AddProducto';
import ProductoDetails from '../pages/ProductoDetails';
import EditProducto from '../pages/EditProducto';
import React from 'react';

interface Route {
  path: string;
  component: React.FC;
}

const routes: Route[] = [
  { path: '/', component: Catalog },
  { path: '/add-producto', component: AddProducto },
  { path: '/producto/:id', component: ProductoDetails },
  { path: '/editar-producto/:id', component: EditProducto },  // Correcta ruta de edición
];

export default routes;
