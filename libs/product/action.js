// Product database operations
import pool from "@/libs/db";
// Fungsi untuk mengambil semua produk
export async function getAllProducts(search = "", page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const searchTerm = `%${search}%`;
    try {
        const [products] = await pool.query(
            `SELECT * FROM products
WHERE name LIKE ?
ORDER BY id ASC
LIMIT ? OFFSET ?`,
            [searchTerm, limit, offset],
        );
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export async function getProductCount(search = "") {
    const searchTerm = `%${search}%`;
    try {
        const [rows] = await pool.query(
            "SELECT COUNT(*) as count FROM products WHERE name LIKE ?",
            [searchTerm],
        );
        return rows[0].count;
    } catch (error) {
        return 0;
    }
}

export async function getProductById(id) {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM products WHERE id = ?",
            [id]
        );

        return rows[0] || null;
    } catch (error) {
        console.error(error);
        throw new Error("Gagal mengambil data produk");
    }
}

export async function createProduct({ name, price, stock }) {
    try {
        const [result] = await pool.query(
            "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
            [name, price, stock],
        );
        return result.insertId;
    } catch (error) {
        console.error("Error creating product:", error);
        throw new Error("Failed to create product");
    }
}

// Fungsi untuk memperbarui produk
export async function updateProduct(id, productData) {
    try {
        const { name, price, stock } = productData;
        const [result] = await pool.query(
            "UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?",
            [name, price, stock, id],
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error updating product:", error);
        throw new Error("Failed to update product");
    }
}

export async function deleteProduct(id) {
    try {
        const [result] = await pool.query(
            "DELETE FROM products WHERE id = ?",
            [id]
        );

        return result.affectedRows > 0;
    } catch (error) {
        console.error(error);
        throw new Error("Gagal delete");
    }
}
