"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../context/UserContext';

const LogoutPage: React.FC = () => {
  const { setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      // Clear user session or token
      setUser(null); // Assuming useUser has a method to clear user state
      
      // You might want to also clear cookies or local storage if needed
      // localStorage.removeItem('token'); // Example if using local storage
      
      // Redirect to login page after logout
      router.push('/login'); // Adjust the path to your login page
    };

    logout();
  }, [setUser, router]);

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold">Logging Out...</h1>
      <p>Please wait while we log you out.</p>
    </div>
  );
};

export default LogoutPage;
