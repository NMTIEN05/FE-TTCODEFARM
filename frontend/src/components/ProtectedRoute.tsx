// src/components/ProtectedRoute.tsx
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element, requiredRole: string }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || role !== requiredRole) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default ProtectedRoute;
