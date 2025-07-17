import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";

export const AuthProvider = ({ children}: {children: ReactNode}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    
    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
    }
    
    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
