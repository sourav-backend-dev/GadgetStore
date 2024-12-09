'use client';
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';

const CheckoutPage: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    paymentMethod: 'credit-card', // Default to credit card
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle payment method change
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      paymentMethod: value,
    }));
  };

  // Handle form validation
  const validateForm = () => {
    let formErrors: { [key: string]: string } = {};

    // Name Validation: Only alphabetic characters allowed
    if (!formData.name) formErrors.name = 'Name is required';
    else if (!/^[A-Za-z\s]+$/.test(formData.name)) formErrors.name = 'Name must contain only letters and spaces';

    // Email Validation: Must be a valid email format
    if (!formData.email) formErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Email is invalid';

    // Address Validation
    if (!formData.address) formErrors.address = 'Address is required';

    // Phone Validation: Must be exactly 10 digits
    if (!formData.phone) formErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) formErrors.phone = 'Phone number must be 10 digits';

    // Payment Method Validation
    if (!formData.paymentMethod) formErrors.paymentMethod = 'Please select a payment method';

    // Credit Card Fields Validation (Only if credit card is selected)
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber) formErrors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber)) formErrors.cardNumber = 'Card number must be 16 digits';

      if (!formData.cardExpiry) formErrors.cardExpiry = 'Expiry date is required';
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) formErrors.cardExpiry = 'Expiry date must be in MM/YY format';

      if (!formData.cardCvc) formErrors.cardCvc = 'CVC is required';
      else if (!/^\d{3}$/.test(formData.cardCvc)) formErrors.cardCvc = 'CVC must be 3 digits';
    }

    return formErrors;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Here, you would typically make an API request to process the payment
      console.log('Checkout successful:', formData);
      clearCart();
      // Redirect to Thank You page after successful checkout
      router.push('/thank-you'); // Navigate to the Thank You page
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty. Please add some products to checkout.</p>
      ) : (
        <>

          <div className="row">
            {/* Checkout Form Column */}
            <div className="col-md-7">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Shipping Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  {errors.address && <div className="text-danger">{errors.address}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  {errors.phone && <div className="text-danger">{errors.phone}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    className="form-control"
                    value={formData.paymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    <option value="credit-card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                  </select>
                  {errors.paymentMethod && <div className="text-danger">{errors.paymentMethod}</div>}
                </div>

                {/* Credit Card Fields */}
                {formData.paymentMethod === 'credit-card' && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="cardNumber" className="form-label">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        className="form-control"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                      />
                      {errors.cardNumber && <div className="text-danger">{errors.cardNumber}</div>}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="cardExpiry" className="form-label">Expiry Date (MM/YY)</label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        className="form-control"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                      />
                      {errors.cardExpiry && <div className="text-danger">{errors.cardExpiry}</div>}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="cardCvc" className="form-label">CVC</label>
                      <input
                        type="text"
                        id="cardCvc"
                        name="cardCvc"
                        className="form-control"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                      />
                      {errors.cardCvc && <div className="text-danger">{errors.cardCvc}</div>}
                    </div>
                  </>
                )}

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-success btn-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </form>
            </div>

<div className="col-md-1"></div>
            {/* Cart Products Column */}
            <div className="col-md-4">
              <h4>Your Cart</h4>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul className="list-group">
                  {cart.map((item, index) => (
                    <li key={index} className="list-group-item">
                      <div>{item.name} - ${item.price.toFixed(2)}</div>
                      <div>Quantity: {item.quantity}</div>
                    </li>
                  ))}
                </ul>
              )}
              <h5 className="mt-3">Total: ${totalPrice.toFixed(2)}</h5>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
