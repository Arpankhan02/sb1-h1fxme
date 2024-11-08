import React, { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const { items, total } = useCartStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Calculate total with tax
  const calculateTotal = () => (total * 1.1).toFixed(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    navigate('/success');
  };

  // Reusable input field component
  const InputField = ({
    label,
    type,
    placeholder,
    pattern,
    required,
    ...rest
  }: {
    label: string;
    type: string;
    placeholder: string;
    pattern?: string;
    required: boolean;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        pattern={pattern}
        required={required}
        className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600"
        {...rest}
      />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-8"
      >
        <ArrowLeft size={20} />
        Back to Cart
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Shipping Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="First Name"
                  type="text"
                  placeholder="John"
                  required={true}
                />
                <InputField
                  label="Last Name"
                  type="text"
                  placeholder="Doe"
                  required={true}
                />
                <div className="col-span-2">
                  <InputField
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    required={true}
                  />
                </div>
                <div className="col-span-2">
                  <InputField
                    label="Address"
                    type="text"
                    placeholder="123 Street"
                    required={true}
                  />
                </div>
                <InputField
                  label="City"
                  type="text"
                  placeholder="City Name"
                  required={true}
                />
                <InputField
                  label="Postal Code"
                  type="text"
                  placeholder="12345"
                  required={true}
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Payment Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      pattern="[0-9]{16}"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600"
                    />
                    <CreditCard className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Expiry Date"
                    type="text"
                    placeholder="MM/YY"
                    pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
                    required={true}
                  />
                  <InputField
                    label="CVC"
                    type="text"
                    placeholder="123"
                    pattern="[0-9]{3,4}"
                    required={true}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <Lock size={20} />
                  Pay ${calculateTotal()}
                </>
              )}
            </button>
          </form>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="font-medium text-indigo-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${(total * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold text-indigo-600">
                    ${calculateTotal()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
