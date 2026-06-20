"use client";

import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import { useAuth } from "@/app/context/AuthContext";

export default function LogoutButton() {
    const router = useRouter();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        router.replace("/");
        router.refresh();
    };

    return (
        <div className="gap-4">
            <Button onClick={handleLogout} variant="secondary">
                Logout
            </Button>
        </div>
    );
}
