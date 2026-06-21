"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import { authApi } from "@/app/lib/api";
import type {
    AuthContextType,
    AuthLoginResponse,
    AuthProviderProps,
    AuthSessionResponse,
} from "@/types";

const AuthContext = createContext<AuthContextType | null>(
    null
);

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        authApi
            .get<AuthSessionResponse>("/session")
            .then((response) => {
                setIsLoggedIn(response.data.isLoggedIn);
                setEmail(response.data.email);
            })
            .catch(() => {
                setIsLoggedIn(false);
                setEmail(null);
            });
    }, []);

    const login = async (email: string, password: string) => {
        const response = await authApi.post<AuthLoginResponse>("/login", {
            email,
            password,
        });

        setIsLoggedIn(response.data.isLoggedIn);
        setEmail(response.data.email);
    };

    const logout = async () => {
        await authApi.post("/logout");
        setIsLoggedIn(false);
        setEmail(null);
    };

    const deleteAccount = async () => {
        await authApi.delete("/account", {
            validateStatus: (status) => status < 500,
        });
        setIsLoggedIn(false);
        setEmail(null);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                email,
                login,
                logout,
                deleteAccount,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context)
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );

    return context;
}
