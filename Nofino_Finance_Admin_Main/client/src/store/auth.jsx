/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";


/// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");

    const AuthorizationToken = `Bearer ${token}`;
    // storing token in local storage

    const storeTokenInLs = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    // tracking your Logout
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    };

    //jwt auth datan andfact\
    const URL = `${import.meta.env.VITE_API_URL}/api/auth/user`;
    const userAuthentication = async () => {
        try {
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    Authorization: AuthorizationToken
                },
            });
            if(response.ok){
                const data = await response.json();
                setUser(data.userData);
            };

        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            console.error("Error Fetching user Data");

        }
    };

    useEffect(() => {
        userAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <AuthContext.Provider value={{ storeTokenInLs, LogoutUser, token, user, AuthorizationToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContextValue;
};
