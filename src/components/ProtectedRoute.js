// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    ); // Show loading spinner while checking user authentication
  }

  if (!user) {
    return <Navigate to="/" replace />; // Redirect to login page if the user is not authenticated
  }

  return children; // Render the protected content if the user is authenticated
};

export default ProtectedRoute;
