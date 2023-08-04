import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({isAllowed, children, redirectTo = "/landing"}) => {
    if(!isAllowed){
        return <Navigate to={redirectTo}/>
    }
    // return  <Outlet />
    return children ? children : <Outlet />
}