"use client";
import { useState } from "react";

export default function DeleteModal({ productId, productName, deleteAction }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <button
                onClick={handleOpen}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600
transition-colors duration-200 text-sm font-medium ml-2"
            >
                Hapus
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">

                        <div className="mb-6">
                            <p className="text-gray-700">
                                Apakah Anda yakin ingin menghapus produk{" "}
                                <strong>{productName}</strong>?
                            </p>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={handleClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border rounded-md hover:bg-gray-200"
                            >
                                Batal
                            </button>

                            <form action={deleteAction}>
                                <input type="hidden" name="id" value={productId} />
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                                >
                                    Hapus Produk
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}