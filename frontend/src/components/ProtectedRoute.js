// src/components/ProtectedRoute.js
// This component handles route protection for admin-only routes

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  // Render the child routes
  return <Outlet />;
};

export default ProtectedRoute;