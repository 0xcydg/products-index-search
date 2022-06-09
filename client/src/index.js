import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Product from './components/Product';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/products/product/:productId' element={<Product />} />
        <Route path='/products' element={<App />} />
        <Route path='*' element={<Navigate replace to='/products' />} />
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

