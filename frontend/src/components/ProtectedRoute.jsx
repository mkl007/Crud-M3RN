import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

export default function ProtectedRoute() {

  const { loading, isAuthenticated } = useAuth();
  if (loading) return console.log('Loading..')
  else if (!isAuthenticated && !loading) return <Navigate to='/login' />
  
    return <Outlet />;
}
