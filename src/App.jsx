import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PartnersPage from './pages/PartnersPage'
import CertificatesPage from './pages/CertificatesPage'
import ContactsPage from './pages/ContactsPage'
import CatalogPage from './pages/CatalogPage'
import ProductPage from './pages/ProductPage'
import OrderPage from './pages/OrderPage'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:category" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
