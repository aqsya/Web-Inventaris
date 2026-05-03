"use server";

import { signIn, signOut } from "@/auth";
import pool from "@/libs/db";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function authenticate(formData) {
    try {
        await signIn("credentials", {
            username: formData.get("username"),
            password: formData.get("password"),
            redirectTo: "/product",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Username atau Password salah.";
                default:
                    return "Terjadi kesalahan sistem.";
            }
        }

        throw error;
    }
}

export async function handleLogout() {
    await signOut({ redirectTo: "/login" });
}

export async function registerUser(formData) {
    const name = formData.get("name");
    const username = formData.get("username");
    const password = formData.get("password");

    if (!name || !username || !password) {
        return "Semua field harus diisi.";
    }

    try {
        const [existingUser] = await pool.query(
            "SELECT id FROM users WHERE username = ?",
            [username],
        );

        if (existingUser.length > 0) {
            return "Username sudah digunakan.";
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            "INSERT INTO users (name, username, password) VALUES (?, ?, ?)",
            [name, username, hashedPassword],
        );
    } catch (error) {
        console.error("Register Error:", error);
        return "Gagal melakukan registrasi.";
    }

    redirect("/login?message=Registrasi Berhasil, silakan login.");
}
