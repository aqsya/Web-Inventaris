import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import pool from "@/libs/db";
import bcrypt from "bcryptjs";

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const username = credentials?.username;
                const password = credentials?.password;

                if (!username || !password) {
                    return null;
                }

                const [users] = await pool.query(
                    "SELECT * FROM users WHERE username = ?",
                    [username],
                );
                const user = users[0];

                if (!user) return null;

                const passwordsMatch = await bcrypt.compare(password, user.password);

                if (passwordsMatch) {
                    return {
                        id: String(user.id),
                        name: user.name,
                        email: user.username,
                    };
                }

                return null;
            },
        }),
    ],
});
