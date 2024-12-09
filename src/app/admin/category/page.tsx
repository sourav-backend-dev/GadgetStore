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
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formCategory, setFormCategory] = useState({
    name: "",
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortKey, setSortKey] = useState<keyof Category>("name");
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
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // Filter categories by search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort filtered categories based on the selected key and order
  const sortedCategories = filteredCategories.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    } else {
      return a[sortKey] < b[sortKey] ? 1 : -1;
    }
  });

  // Pagination logic
  const indexOfLastCategory = currentPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const currentCategories = sortedCategories.slice(indexOfFirstCategory, indexOfLastCategory);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCategory) {
      const response = await fetch(`/api/categories/${editingCategory.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formCategory),
      });

      if (response.ok) {
        const updatedCategory = await response.json();
        setCategories((prev) =>
          prev.map((category) =>
            category.id === updatedCategory.id ? updatedCategory : category
          )
        );
      }
    } else {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formCategory),
      });

      const createdCategory = await response.json();
      setCategories((prev) => [...prev, createdCategory]);
    }

    resetCategoryForm();
  };

  const handleDeleteCategory = async (id: number) => {
    // Check if there are products associated with this category
    const associatedProducts = products.filter((product) => product.categoryId === id);
    if (associatedProducts.length > 0) {
      alert("Cannot delete category. Products are associated with this category.");
      return;
    }

    const response = await fetch("/api/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setCategories((prev) => prev.filter((category) => category.id !== id));
    }
  };

  const resetCategoryForm = () => {
    setEditingCategory(null);
    setFormCategory({
      name: "",
    });
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 text-primary">Admin Dashboard</h1>
      <p className="text-center">Welcome, <strong>{user.email}</strong>! Manage your categories below.</p>

      {/* Category Form */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </div>
            <div className="card-body">
              <form onSubmit={handleCategorySubmit}>
                <div className="mb-3">
                  <label className="form-label">Category Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formCategory.name}
                    onChange={handleCategoryChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  {editingCategory ? "Update Category" : "Add Category"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Category List */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white">Category List</div>
            <div className="card-body">
              {/* Search Bar */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Categories"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <ul className="list-group list-group-flush">
                {currentCategories.map((category) => {
                  // Count products associated with the category
                  const productCount = products.filter(
                    (product) => product.categoryId === category.id
                  ).length;

                  return (
                    <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                      {category.name}
                      <span className="badge bg-info">{productCount} Products</span>
                      <div>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => {
                            setEditingCategory(category);
                            setFormCategory({ name: category.name });
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm ms-2"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Pagination */}
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center mt-3">
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    >
                      Previous
                    </button>
                  </li>
                  <li className="page-item">
                    <button className="page-link" onClick={() => setCurrentPage((prev) => prev + 1)}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
