// src/app/layout.tsx
"use client"; 

// import './globals.css';
import { UserProvider } from '@/context/UserContext';
import Navbar from '../components/Navbar'; // Adjust path if necessary
import { CartProvider } from '@/context/CartContext';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from '@/components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
