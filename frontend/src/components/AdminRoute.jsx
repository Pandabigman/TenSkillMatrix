// components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
// Assume you have an auth context or store where you keep the current user
import { useAuth } from '../context/AuthContext'; 

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useAuth(); // Replace with however you access your user state

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // If not logged in, or logged in but NOT an admin, kick them out
  if (!user || !user.is_admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;