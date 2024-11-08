import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Product } from '../types/product';
import { useCartStore } from '../store/cartStore';
import { ShoppingBag, Heart, Share2, Star, ChevronRight, Truck } from 'lucide-react';
import Model from './Model';

interface ProductViewProps {
  product: Product;
  onClose: () => void;
}

export default function ProductView({ product, onClose }: ProductViewProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [showModel, setShowModel] = useState(false);

  const handleAddToCart = () => {
    if (selectedSize) {
      addItem(product);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-6xl w-full overflow-hidden relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
          >
            ×
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Column - Images */}
            <div className="p-8 bg-gray-50">
              <div className="aspect-square rounded-xl overflow-hidden mb-4">
                {showModel ? (
                  <div className="w-full h-full bg-gray-100 rounded-xl">
                    <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
                      <ambientLight intensity={0.7} />
                      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.7} />
                      <Model modelPath={product.model} />
                      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={4} />
                    </Canvas>
                  </div>
                ) : (
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-4">
                <button
                  onClick={() => setShowModel(!showModel)}
                  className="w-24 h-24 flex-shrink-0 rounded-lg border-2 border-transparent hover:border-indigo-600 overflow-hidden"
                >
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <Share2 className="w-8 h-8 text-gray-400" />
                  </div>
                </button>
                {product.images.map((image) => (
                  <button
                    key={image}
                    onClick={() => {
                      setSelectedImage(image);
                      setShowModel(false);
                    }}
                    className={`w-24 h-24 flex-shrink-0 rounded-lg border-2 ${
                      selectedImage === image
                        ? 'border-indigo-600'
                        : 'border-transparent hover:border-indigo-600'
                    } overflow-hidden`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="p-8">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <span>{product.category}</span>
                <ChevronRight size={16} />
                <span>New Arrivals</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(128 reviews)</span>
              </div>

              <p className="text-3xl font-bold text-indigo-600 mb-6">
                ${product.price.toFixed(2)}
              </p>

              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Featured Collection */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Featured Collection</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>New Arrivals</li>
                  <li>Just Landed</li>
                  <li>Classics Spotlight</li>
                  <li>The Latest</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Select Size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-lg border ${
                        selectedSize === size
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                          : 'border-gray-300 hover:border-indigo-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Select Color</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full border ${
                        selectedColor === color
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                          : 'border-gray-300 hover:border-indigo-600'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold ${
                    selectedSize
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag size={20} />
                  Add to Cart
                </button>
                <button className="p-3 rounded-full border border-gray-300 hover:border-indigo-600 hover:text-indigo-600">
                  <Heart size={20} />
                </button>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <Truck size={16} className="text-indigo-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
