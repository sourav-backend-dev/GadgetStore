"use client"; // Ensures the component is client-side

import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import HomeSlider from '@/components/Slider';
import Testimonial from '@/components/Testimonial';
import Loader from '@/components/Loader';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';  // Updated import

const HomePage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const router = useRouter();

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/featured-products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Check if user is logged in and redirect if not
  useEffect(() => {
    if (!user) {
      router.push('/login');  // This will redirect the user to the login page
    } else {
      fetchProducts();
    }
  }, [user, router]);

  // Display loader while data is being fetched
  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      {/* Home Slider Section */}
      <HomeSlider />

      {/* Featured Products Section */}
      <section style={styles.featuredSection}>
        <h2 style={styles.sectionHeader}>Featured Products</h2>
        <div style={styles.row}>
          {products.map((product) => (
            <div style={styles.cardWrapper} key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={styles.callToActionSection}>
        <div style={styles.callToActionContainer}>
          <h2 style={styles.callToActionTitle}>Join Us Today!</h2>
          <p style={styles.callToActionText}>Sign up for exclusive offers and updates.</p>
          <a href="/signup" style={styles.ctaButton}>Sign Up</a>
        </div>
      </section>

      {/* Testimonial Section */}
      <Testimonial />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: '"Poppins", sans-serif',
    backgroundColor: '#F4F4F4',
    paddingBottom: '5rem',
  },
  featuredSection: {
    padding: '4rem 1rem',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: '2.5rem',
    fontWeight: '600',
    color: '#2E3B4E',
    marginBottom: '3rem',
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2rem',
  },
  cardWrapper: {
    width: '280px',
    transition: 'transform 0.3s ease-in-out',
  },
  callToActionSection: {
    backgroundColor: '#2E3B4E',
    color: '#fff',
    padding: '5rem 1rem',
    textAlign: 'center',
  },
  callToActionContainer: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  callToActionTitle: {
    fontSize: '2.5rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
  },
  callToActionText: {
    fontSize: '1.2rem',
    color: '#D1D1D1',
    marginBottom: '2rem',
  },
  ctaButton: {
    fontSize: '1.2rem',
    padding: '0.75rem 2rem',
    backgroundColor: '#F7A100',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '30px',
    transition: 'background-color 0.3s ease-in-out',
  },
  ctaButtonHover: {
    backgroundColor: '#F39C12',
  },
};

export default HomePage;
