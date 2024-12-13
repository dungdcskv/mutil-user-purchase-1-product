const mysql = require('mysql2');

// Create a connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'redis'
});

// Test the connection
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id', connection.threadId);
});

// const createProductTable = `
//     CREATE TABLE IF NOT EXISTS product (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         price DECIMAL(10, 2) NOT NULL,
//         stock INT NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
// `;

// connection.query(createProductTable, (err, results) => {
//     if (err) {
//         console.error('Error creating table:', err);
//         return;
//     }
//     console.log('Table `product` created or already exists:', results);
// });

// const insertProduct = `
//     INSERT INTO product (name, price, stock) VALUES
//     ('iPhone 13', 999.99, 10),
//     ('Samsung Galaxy S21', 899.99, 20),
//     ('Google Pixel 6', 599.99, 15);
// `;

// connection.query(insertProduct, (err, results) => {
//     if (err) {
//         console.error('Error inserting data:', err);
//         return;
//     }
//     console.log('Sample data inserted:', results);
// });

// Close the connection
connection.end();
