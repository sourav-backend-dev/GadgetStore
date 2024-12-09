import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Inline style for the transition effects
  const cardStyle = {
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  };

  const cardHoverStyle = {
    transform: 'translateY(-10px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
  };

  const imgStyle = {
    transition: 'transform 0.3s ease',
  };

  const imgHoverStyle = {
    transform: 'scale(1.05)',
  };

  return (
    <div
      className="card"
      style={cardStyle}
      onMouseEnter={(e) => {
        // Apply hover effect on mouse enter
        (e.currentTarget as HTMLElement).style.transform = cardHoverStyle.transform;
        (e.currentTarget as HTMLElement).style.boxShadow = cardHoverStyle.boxShadow;
      }}
      onMouseLeave={(e) => {
        // Revert to normal style on mouse leave
        (e.currentTarget as HTMLElement).style.transform = '';
        (e.currentTarget as HTMLElement).style.boxShadow = cardStyle.boxShadow;
      }}
    >
      <a href={`/products/${product.id}`} className="text-decoration-none">
        <img
          src={product.imageUrl}
          height={250}
          alt={product.name}
          className="card-img-top object-cover w-100"
          style={imgStyle}
          onMouseEnter={(e) => (e.currentTarget.style.transform = imgHoverStyle.transform)}
          onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
        />
        <div className="card-body d-flex flex-column p-4">
          <h5 className="card-title mb-2 text-primary">{product.name}</h5>
          <p className="card-text text-secondary mb-3">${product.price.toFixed(2)}</p>
          <button className="btn btn-outline-primary mt-auto">View Product</button>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
