import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Components/Assets/Logo.svg';
import './NavBar.css';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-6 bg-white shadow-md">
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="w-16 mr-4" />
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/recipes" className="nav-link">Recipes</Link>
        <Link to="/testimonials" className="nav-link">Testimonials</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
        <Link to="/recipes" className="primary-button">Get Started</Link>
      </div>
    </nav>
  );
};

export default Navbar;
