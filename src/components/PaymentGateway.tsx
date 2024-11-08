import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-publishable-key-here');

export default function PaymentGateway({ amount }: { amount: number }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    if (!stripe) {
      alert('Stripe.js has not loaded yet.');
      return;
    }

    // Create a payment request (e.g., create a checkout session on the backend)
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Product' },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    });

    if (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-indigo-600 text-white py-2 px-4 rounded-lg"
      >
        {loading ? 'Processing...' : `Pay $${amount}`}
      </button>
    </div>
  );
}
