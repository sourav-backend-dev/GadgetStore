'use client';
import React, { useState, useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import Loader from '@/components/Loader';

const ProductDetails: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { addToCart } = useCart();
  const productId = parseInt(params.id, 10); // Ensure you're parsing with a base

  const [product, setProduct] = useState<ProductDetailsProps['product'] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) {
      console.error("Product data is not available");
      return; 
    }
    console.log(product);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
  };

  if (error) {
    return <h1>Error: {error}</h1>;
  }
  if (loading) {
    return <Loader/>;
  }
  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{height:"500px",width:"500px"}}
            className="img-fluid rounded-lg shadow-sm"
          />
        </div>
        <div className="col-md-6">
          <h1 className="display-4 mb-4">{product.name}</h1>
          <p className="h4 text-muted mb-4">${product.price.toFixed(2)}</p>
          <p className="lead text-muted">{product.description}</p>
          <button
            className="btn btn-primary btn-lg mt-4"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
