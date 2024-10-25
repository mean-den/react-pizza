import React, { Suspense } from 'react';
import './scss/app.scss';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const PizzaPage = React.lazy(() => import(/* webpackChunkName: "PizzaPage" */ './pages/PizzaPage'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" 
         element={
           <React.Suspense fallback={<div>Cart is loading...</div>}>
             <Cart />
           </React.Suspense>
          } 
        />
        <Route path="pizza/:id" 
         element={
           <React.Suspense fallback={<div>Loading...</div>}>
             <PizzaPage />
           </React.Suspense>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
