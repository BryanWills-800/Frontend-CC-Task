"use server";

import fs from "fs";
import path from "path";
import type { User } from "@/types";

const userFilePath = path.join(process.cwd(), "data", "user.json");

export async function getAllUsers(): Promise<User[]> {
    try {
        const data = await fs.promises.readFile(userFilePath, "utf-8");

        if (!data.trim()) {
            return [];
        }

        return JSON.parse(data);
    } catch (error) {
        console.error("Error in getAllUsers:", error);
        return [];
    }
}

export async function getSingleUser(email: string): Promise<User | null> {
    try {
        const users = await getAllUsers();
        return users.find((user: User) => user.email === email) ?? null;
    } catch (error) {
        console.error("Error in getSingleUser:", error);
        return null;
    }
}

export async function createUser(user: User): Promise<boolean> {
    try {
        const users = await getAllUsers();
        users.push(user);
        await fs.promises.writeFile(userFilePath, JSON.stringify(users, null, 2));
        return true;
    } catch (error) {
        console.error("Error in createUser:", error);
        return false;
    }
}

export async function deleteUser(user: User): Promise<boolean> {
    try {
        const users = await getAllUsers();
        const filteredUsers = users.filter((u: User) => u.email !== user.email);
        await fs.promises.writeFile(userFilePath, JSON.stringify(filteredUsers, null, 2));
        return true;
    } catch (error) {
        console.error("Error in deleteUser:", error);
        return false;
    }
}
