import { getProductById, updateProduct } from "@/libs/product/action";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function EditProductPage({ params }) {
    const { id } = await params;

    if (!id || isNaN(parseInt(id))) {
        console.error("Invalid product ID:", id);
        notFound();
    }

    const productId = parseInt(id);
    const product = await getProductById(productId);

    if (!product) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Edit Produk</h1>
                    <p className="text-gray-600 mt-2">
                        Ubah informasi produk #{product.id}
                    </p>
                </div>

                <form action={handleUpdate.bind(null, product.id)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <label
                            htmlFor="name"
                            className="text-sm font-semibold text-gray-700 md:text-right md:pr-4 order-1 md:order-1"
                        >
                            Nama Produk *
                        </label>
                        <div className="md:col-span-2 order-2 md:order-2">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                defaultValue={product.name}
                                placeholder="Masukkan nama produk"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-500 text-gray-900"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <label
                            htmlFor="price"
                            className="text-sm font-semibold text-gray-700 md:text-right md:pr-4 order-1 md:order-1"
                        >
                            Harga (Rp) *
                        </label>
                        <div className="md:col-span-2 order-2 md:order-2">
                            <input
                                type="number"
                                id="price"
                                name="price"
                                required
                                min="0"
                                step="1000"
                                defaultValue={product.price}
                                placeholder="0"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-500 text-gray-900"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <label
                            htmlFor="stock"
                            className="text-sm font-semibold text-gray-700 md:text-right md:pr-4 order-1 md:order-1"
                        >
                            Stok *
                        </label>
                        <div className="md:col-span-2 order-2 md:order-2">
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                required
                                min="0"
                                defaultValue={product.stock}
                                placeholder="0"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-500 text-gray-900"
                            />
                        </div>
                    </div>

                    <div className="md:col-start-2 md:col-span-2 flex gap-4 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Update
                        </button>

                        <Link
                            href="/product"
                            className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold text-center hover:bg-gray-600 transition-colors"
                        >
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

async function handleUpdate(productId, formData) {
    "use server";

    const name = formData.get("name")?.toString().trim();
    const price = parseFloat(formData.get("price"));
    const stock = parseInt(formData.get("stock"));

    if (!name || name.length === 0) {
        throw new Error("Nama produk tidak boleh kosong");
    }

    if (isNaN(price) || price < 0) {
        throw new Error("Harga harus berupa angka positif");
    }

    if (isNaN(stock) || stock < 0) {
        throw new Error("Stok harus berupa angka positif");
    }

    try {
        await updateProduct(productId, { name, price, stock });
    } catch (error) {
        console.error("Error updating product:", error);
        throw new Error("Gagal mengupdate produk");
    }

    redirect("/product");
}
