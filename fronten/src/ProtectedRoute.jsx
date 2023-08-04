import React from 'react'
import { useAuth } from './context/authContext'
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {

  const { loading, isAuthenticated } = useAuth();
  console.log(loading, isAuthenticated)
  // if(loading) return <h1>Loading....</h1>
  if (loading) {
    return (
      <div className="progress" >
        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: "75%"}}></div>
      </div>
    )
  }
  if (!isAuthenticated && !loading) return <Navigate to='/login' replace />
  return <Outlet />;
}


//