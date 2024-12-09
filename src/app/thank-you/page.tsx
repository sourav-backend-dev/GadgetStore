// src/app/thank-you/page.tsx

'use client';
import React from 'react';

const ThankYouPage: React.FC = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center text-success mb-4">Thank You for Your Order!</h1>
      <p className="text-center">
        Your order has been successfully placed. We will process it shortly and send you a confirmation email.
      </p>
      <div className="text-center mt-4">
        <a href="/" className="btn btn-primary">Return to Home</a>
      </div>
    </div>
  );
};

export default ThankYouPage;
