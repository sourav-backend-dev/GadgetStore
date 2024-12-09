"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignupPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Use router for navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Alphabetic validation for names
    const nameRegex = /^[A-Za-z]+$/;

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      setError("Names should contain only alphabetic characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password, roleId: 2 }),
    });

    const data = await response.json();
    if (response.ok) {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      // Navigate to login page after successful signup
      router.push('/login');
    } else {
      setError(data.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">Signup</h1>
      <form onSubmit={handleSubmit} className="col-md-6 mx-auto needs-validation" noValidate>
        <div className="form-group mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`form-control ${firstName && /^[A-Za-z]+$/.test(firstName) ? '' : 'is-invalid'}`}
            required
          />
          <div className="invalid-feedback">First name should contain only alphabetic characters.</div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`form-control ${lastName && /^[A-Za-z]+$/.test(lastName) ? '' : 'is-invalid'}`}
            required
          />
          <div className="invalid-feedback">Last name should contain only alphabetic characters.</div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-control ${email && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) ? '' : 'is-invalid'}`}
            required
          />
          <div className="invalid-feedback">Please enter a valid email address.</div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`form-control ${password.length >= 6 ? '' : 'is-invalid'}`}
            required
            minLength={6}
          />
          <div className="invalid-feedback">Password must be at least 6 characters long.</div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`form-control ${password === confirmPassword ? '' : 'is-invalid'}`}
            required
          />
          <div className="invalid-feedback">Passwords do not match.</div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Link href="/login">Already have an account?</Link>
          <button type="submit" className="btn btn-primary">Signup</button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
