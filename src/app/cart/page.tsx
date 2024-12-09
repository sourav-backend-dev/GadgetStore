// src/app/cart/page.tsx

'use client';
import React from 'react';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';  // For navigation

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();
  const router = useRouter();

  // Navigate to checkout page
  const handleCheckout = () => {
    router.push('/checkout'); // Assuming the checkout page is '/checkout'
  };

  return (
    <div className="container my-5">
      <h1 className="text-center text-primary mb-5">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <>
          <div className="list-group">
            {cart.map(item => (
              <div key={item.id} className="list-group-item d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="img-fluid" style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "8px" }}
                  />
                  <div className="ms-3">
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="mb-1 text-muted">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <p className="mb-1">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    className="btn btn-sm btn-danger mt-2"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-between mt-4">
            <h2 className="text-end">Total: ${totalPrice.toFixed(2)}</h2>
            <button
              className="btn btn-danger ms-2"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
          <div className="text-center mt-5">
            <button
              className="btn btn-success btn-lg"
              onClick={handleCheckout}
              disabled={cart.length === 0} // Disable if cart is empty
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
