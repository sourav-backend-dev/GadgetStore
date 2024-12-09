"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../context/UserContext'; 

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset the error message on submit
    setError('');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setUser(data.user);
      if (data.user.roleId === 1) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } else {
      setError(data.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleSubmit} className="col-md-6 mx-auto needs-validation" noValidate>
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-control ${email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) ? 'is-invalid' : ''}`}
            required
          />
          <div className="invalid-feedback">
            Please enter a valid email address.
          </div>
        </div>
        
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
            minLength={6}
          />
          <div className="invalid-feedback">
            Password must be at least 6 characters long.
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Link href="/signup">Don't have an account?</Link>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
