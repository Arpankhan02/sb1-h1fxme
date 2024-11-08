import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { products } from './data/products';
import ProductCard from './components/ProductCard';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import SuccessPage from './components/SuccessPage';
import { Footprints } from 'lucide-react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <Footprints className="h-8 w-8 text-indigo-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                  STRIDE
                </h1>
              </Link>
              <nav className="hidden md:flex gap-8">
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">New Arrivals</a>
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Men</a>
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Women</a>
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Kids</a>
              </nav>
              <Link
                to="/cart"
                className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors"
              >
                Cart
              </Link>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={
            <>
              <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
                  <div className="text-center">
                    <h2 className="text-5xl font-bold mb-6">Step into the Future</h2>
                    <p className="text-xl text-indigo-100 mb-8">Experience shoes in stunning 3D before you buy</p>
                    <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors">
                      Shop Now
                    </button>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
              </div>

              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Featured Collection</h2>
                    <p className="text-gray-600 mt-2">Discover our latest and most popular styles</p>
                  </div>
                  <div className="flex gap-4">
                    <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors">
                      All
                    </button>
                    <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors">
                      Running
                    </button>
                    <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors">
                      Lifestyle
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </main>
            </>
          } />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>

        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Footprints className="h-6 w-6 text-indigo-400" />
                  <span className="text-xl font-bold">STRIDE</span>
                </div>
                <p className="text-gray-400">Experience the perfect blend of style, comfort, and innovation.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Shop</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">New Arrivals</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Men</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Women</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kids</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Size Guide</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">YouTube</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;