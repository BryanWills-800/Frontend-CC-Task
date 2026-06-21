"use client";

import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import { useAuth } from "@/app/context/AuthContext";

export default function DeleteAccountButton() {
    const router = useRouter();
    const { deleteAccount } = useAuth();

    const handleDeleteAccount = async () => {
        const shouldDelete = window.confirm(
            "Delete your account? This cannot be undone."
        );

        if (!shouldDelete) {
            return;
        }

        await deleteAccount();
        router.replace("/");
        router.refresh();
    };

    return (
        <Button onClick={handleDeleteAccount} variant="accent">
            Delete Account
        </Button>
    );
}
