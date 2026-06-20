"use client";

import LoginButton from "./LoginButton";
import SignUpButton from "./SignUpButton";
import LogoutButton from "./LogoutButton";
import { useAuth } from "@/app/context/AuthContext";

export default function AuthButtons() {
    const { isLoggedIn } = useAuth();

    // Consistent wrapper classes for both states
    const containerClasses = "flex items-center h-14";

    return (
        <div className={containerClasses}>
            {isLoggedIn ? (
                <LogoutButton />
            ) : (
                <>
                    <div className="px-4">
                        <LoginButton />
                    </div>
                    <div className="pr-1.5">
                        <SignUpButton />
                    </div>
                </>
            )}
        </div>
    );
}