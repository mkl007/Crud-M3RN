import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from "../api/auth";
// import { set } from "react-hook-form";
import Cookies from 'js-cookie'


export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState(['']);
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user)
            setIsAuthenticated(true)
            setUser(res.data)
        } catch (error) {
            setErrors(error.response.data)
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            setIsAuthenticated(true);
            setUser(res.data)
        
        } catch (error) {
            // console.log(error)
            if (Array.isArray(error.response)) {
                return setErrors(error.response.data)

            }
            setErrors(error.response.data.message)
        }
        
    }

    const logout = async () => {
        await logoutRequest();
        setIsAuthenticated(false);
        setUser(null)

    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setUser(null)
                setLoading(false)
                return;
            }
            try {
                const res = await verifyTokenRequest(cookies.token)
                if (!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return;
                }

                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)

            } catch (error) {
                // console.log(error)
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)

            }

        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            user,
            loading,
            isAuthenticated,
            errors,
        }}>
            {children}
        </AuthContext.Provider>
    )
}