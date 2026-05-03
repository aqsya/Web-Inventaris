"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function handleSearch(term) {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set("search", term);
        } else {
            params.delete("search");
        }

        params.set("page", "1");
        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        <input
            type="search"
            placeholder="Cari barang..."
            defaultValue={searchParams.get("search")?.toString()}
            onChange={(event) => handleSearch(event.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
}
