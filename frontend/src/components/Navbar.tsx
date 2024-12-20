import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC =()=>{
    return (
        <nav className="navbar">
            <Link to="/"> Catalog</Link>
            <Link to="/add-producto">Add Producto</Link>
        </nav>
    );
};

export default Navbar;