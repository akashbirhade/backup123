import type React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PropertyPage from './pages/PropertyPage';
import SearchPage from './pages/SearchPage';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/rooms/:id" element={<PropertyPage />} />
          <Route path="*" element={<div className="text-center py-20">Page not found</div>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
