import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {  createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./Navbar/Home"
import About from "./Navbar/About"
import Recipes from "./Navbar/Recipes"
import Login from './Components/Login';
import Register from './Components/Register';
import Testimonial from './Navbar/Testimonials';

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/",
    element: <Home />
  }, 
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/recipes",
    element: <Recipes/>
  },
  {
    path: "/testimonials",
    element: <Testimonial/>
  },
  
  
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
