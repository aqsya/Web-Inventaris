"use client";

import { registerUser } from "@/libs/auth/action";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";

export default function RegisterPage() {
    const [error, setError] = useState("");

    const clientAction = async (formData) => {
        const result = await registerUser(formData);
        if (result) setError(result);
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-200 text-black">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
                    Daftar Akun
                </h1>

                <form action={clientAction} className="flex flex-col gap-4">
                    <div>
                        <label className="block mb-1 font-medium">Nama Lengkap</label>
                        <input
                            name="name"
                            type="text"
                            required
                            className="w-full border p-2 rounded focus:outline-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Username</label>
                        <input
                            name="username"
                            type="text"
                            required
                            className="w-full border p-2 rounded focus:outline-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full border p-2 rounded focus:outline-blue-500"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <SubmitButton />
                </form>

                <p className="mt-4 text-center text-sm">
                    Sudah punya akun?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Login di sini
                    </Link>
                </p>
            </div>
        </main>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
            {pending ? "Mendaftarkan..." : "Daftar Sekarang"}
        </button>
    );
}
