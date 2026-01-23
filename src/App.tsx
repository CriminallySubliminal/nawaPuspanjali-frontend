import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Landing } from './pages/Landing';
import { Brands } from './pages/Brands';
import { Sizes } from './pages/Sizes';
import { NotebookDetail } from './pages/NotebookDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

/**
 * Main App component with routing configuration.
 */
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/brands/:brandId" element={<Sizes />} />
          <Route path="/notebook/:notebookId" element={<NotebookDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
