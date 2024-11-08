import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Product } from '../types/product';
import { useCartStore } from '../store/cartStore';
import { ShoppingBag, Rotate3D, Eye } from 'lucide-react';
import Model from './Model';
import ProductView from './ProductView';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [showModel, setShowModel] = useState(false);
  const [showProductView, setShowProductView] = useState(false);

  return (
    <>
      <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl">
        <div className="relative h-64">
          {showModel ? (
            <div className="absolute inset-0 bg-gray-100">
              <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
                <ambientLight intensity={0.7} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.7} />
                <Model modelPath={product.model} />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={4} />
              </Canvas>
            </div>
          ) : (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          )}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={() => setShowModel(!showModel)}
              className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-colors"
            >
              <Rotate3D size={20} />
            </button>
            <button
              onClick={() => setShowProductView(true)}
              className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-colors"
            >
              <Eye size={20} />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
            <span className="text-2xl font-bold text-indigo-600">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">
              {product.category}
            </span>
            <button
              onClick={() => addItem(product)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-indigo-700 transition-colors"
            >
              <ShoppingBag size={18} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {showProductView && (
        <ProductView product={product} onClose={() => setShowProductView(false)} />
      )}
    </>
  );
}