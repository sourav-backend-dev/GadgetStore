"use client";
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import Loader from '@/components/Loader';
import './page.css';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  

  // Fetch products and categories
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  // Filter products based on search and selected category
  const filterProducts = () => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((product) => product.category.name === selectedCategory);
    }

    // Sort based on selected sort order
    if (sortOrder === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'name-desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, sortOrder]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error fetching products: {error.message}</div>;
  }

  return (
    <section className="container my-5">
      <h2 className="text-center mb-5">Products</h2>

      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-4">
          <div className="sidebar bg-light p-3 rounded">
            <h4>Filters</h4>
            {/* Category Filter */}
            <div className="mb-3">
              <label htmlFor="categorySelect" className="form-label">Category</label>
              <select
                id="categorySelect"
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Filter */}
            <div className="mb-3">
              <label htmlFor="searchQuery" className="form-label">Search Products</label>
              <input
                type="text"
                id="searchQuery"
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sort Filter */}
            <div className="mb-3">
              <label htmlFor="sortOrder" className="form-label">Sort By</label>
              <select
                id="sortOrder"
                className="form-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="default">Select Sort Option</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="name-asc">Name (A to Z)</option>
                <option value="name-desc">Name (Z to A)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="col-md-9">
          <div className="row">
            {filteredProducts.map((product) => (
              <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
