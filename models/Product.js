const mysql = require('mysql2/promise'); // Use promise-based MySQL client

// Create a connection pool for efficient querying
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'redis',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

class Product {
    // Find a product by its IDW
    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM product WHERE id = ?', [id]);
        return rows[0]; // Return the first matching product
    }

    // Get all products
    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM product');
        return rows;
    }

    // Create a new product
    static async create(data) {
        const { name, price, stock } = data;
        const [result] = await pool.query(
            'INSERT INTO product (name, price, stock) VALUES (?, ?, ?)',
            [name, price, stock]
        );
        return result.insertId; // Return the ID of the new product
    }

    // Update a product by its ID
    static async updateById(id, data) {
        const { stock } = data;
        const [result] = await pool.query(
            'UPDATE product SET stock = ? WHERE id = ?',
            [stock, id]
        );
        return result.affectedRows; // Return the number of rows updated
    }

    // Delete a product by its ID
    static async deleteById(id) {
        const [result] = await pool.query('DELETE FROM product WHERE id = ?', [id]);
        return result.affectedRows; // Return the number of rows deleted
    }
}

module.exports = Product;
