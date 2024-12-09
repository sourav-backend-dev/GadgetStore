"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
}

const AdminPage: React.FC = () => {
  const { user } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]); // New state for categories
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formProduct, setFormProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imageUrl: "",
    categoryId: 1,
    userId: user?.id || 1,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortKey, setSortKey] = useState<keyof Product>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (!user || user.roleId !== 1) {
    return <h1 className="text-danger">Access Denied</h1>;
  }

  // Fetch products and categories
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    };

    const fetchCategories = async () => {
      const response = await fetch("/api/categories"); // Adjust the API endpoint for categories
      const data = await response.json();
      setCategories(data);
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // Filter products by search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort filtered products based on the selected key and order
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    } else {
      return a[sortKey] < b[sortKey] ? 1 : -1;
    }
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" || name === "categoryId" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formProduct),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts((prev) =>
          prev.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
        );
      }
    } else {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formProduct),
      });

      const createdProduct = await response.json();
      setProducts((prev) => [...prev, createdProduct]);
    }

    resetForm();
  };

  const handleDelete = async (id: number) => {
    const response = await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
      categoryId: product.categoryId, // Update categoryId when editing
      userId: user?.id || 1,
    });
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormProduct({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      imageUrl: "",
      categoryId: 1,
      userId: user?.id || 1,
    });
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 text-primary">Admin Dashboard</h1>
      <p className="text-center">Welcome, <strong>{user.email}</strong>! Manage your products below.</p>

      <div className="row">
        {/* Search and Sorting */}
        <div className="col-md-12 mb-4 d-flex justify-content-between align-items-center">
          <input
            type="text"
            className="form-control w-75"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div>
            <select
              className="form-select d-inline-block w-auto me-3"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as keyof Product)}
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="stock">Stock</option>
            </select>
            <select
              className="form-select d-inline-block w-auto"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* Product Form */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formProduct.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    value={formProduct.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={formProduct.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    className="form-control"
                    value={formProduct.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    name="categoryId"
                    className="form-select"
                    value={formProduct.categoryId}
                    onChange={handleChange}
                    required
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    type="text"
                    name="imageUrl"
                    className="form-control"
                    value={formProduct.imageUrl}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
                {editingProduct && (
                  <button
                    type="button"
                    className="btn btn-secondary mt-2 w-100"
                    onClick={resetForm}
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">Product List</div>
            <ul className="list-group list-group-flush">
              {currentProducts.map((product) => (
                <li key={product.id} className="list-group-item d-flex align-items-center">
                  <img
                    src={product.imageUrl || "https://via.placeholder.com/100"}
                    alt={product.name}
                    className="rounded me-3"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                  <div className="flex-grow-1">
                    <strong>{product.name}</strong>
                    <p className="mb-1">{product.description}</p>
                    <span className="text-muted">
                      ${product.price} - Stock: {product.stock}
                    </span>
                  </div>
                  <div>
                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        className="btn btn-info text-light"
                        onClick={() => handleEdit(product)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 50 50">
                          <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger text-light"
                        onClick={() => handleDelete(product.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24">
                          <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-3 mr-3">
              <button
                className="btn btn-outline-primary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              <button
                className="btn btn-outline-primary"
                disabled={currentPage * itemsPerPage >= filteredProducts.length}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
