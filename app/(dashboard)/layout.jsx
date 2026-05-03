import Link from "next/link";

import { handleLogout } from "@/libs/auth/action";
// Layout Khusus untuk area Dashboard (Akan memiliki Navbar & Footer)
export default function DashboardLayout({ children }) {
return (
<div className="flex flex-col min-h-screen">
{/* === NAVBAR === */}
<header className="bg-blue-600 text-white p-4 shadow-md">
<div className="max-w-5xl mx-auto flex justify-between items-center">
<h1 className="text-xl font-bold">Maju Jaya IT</h1>
<nav className="space-x-4">
<Link href="/" className="hover:text-blue-200 font-medium">
Beranda
</Link>
<Link href="/product" className="hover:text-blue-200 font-medium">
Product
</Link>

<form action={handleLogout} className="inline">
<button
type="submit"
className="hover:text-red-200 text-medium font-medium"
>
Logout
</button>
</form>
</nav>
</div>
</header>

{/* === CONTENT / VIEW === */}
<main className="grow p-8 max-w-5xl mx-auto w-full">{children}</main>


{/* === FOOTER === */}
<footer className="bg-gray-800 text-white text-center p-4 mt-auto">
<p>© {new Date().getFullYear()} UMKM Maju Jaya. All rights reserved.</p>
</footer>
</div>
);
}
