import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Landing } from './pages/Landing';
import { BrandNotebooks } from './pages/BrandNotebooks';
import { ProductDetail } from './pages/ProductDetail';
import { Sizes } from './pages/Sizes';
import { Products } from './pages/Products';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ScrollToTop } from './components/layout/ScrollToTop';

/**
 * Main App component with routing configuration.
 */
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/products" element={<Products />} />
          <Route path="/brands" element={<Navigate to="/products" replace />} />
          <Route path="/brands/:brandSlug/notebooks" element={<BrandNotebooks />} />
          <Route path="/brands/:brandSlug/sizes" element={<Sizes />} />
          <Route path="/notebooks/:notebookSlug" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
