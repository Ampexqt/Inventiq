import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import POS from './pages/POS';
import SalesTransactions from './pages/SalesTransactions';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="pos" element={<POS />} />
          <Route path="sales" element={<SalesTransactions />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
