import { createContext } from "react";

type AuthContextType = {
    isLoggedIn: boolean,
    user: User | null;
    setIsLoggedIn: (value: boolean) => void;
    setUser: (user: User | null) => void;
    logout: () => void;
}

interface User {
    id : string;
    username: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export type { AuthContextType, User };

