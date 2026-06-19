-- Inventiq POS Database Schema

CREATE DATABASE IF NOT EXISTS inventiq;
USE inventiq;

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sales Table
CREATE TABLE IF NOT EXISTS sales (
    sale_id INT AUTO_INCREMENT PRIMARY KEY,
    receipt_number VARCHAR(50) NOT NULL UNIQUE,
    total_amount DECIMAL(10, 2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sales Details Table
CREATE TABLE IF NOT EXISTS sales_details (
    sale_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (sale_id) REFERENCES sales(sale_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT
);

-- Insert Initial Seed Data (Products)
INSERT INTO products (product_name, price, stock_quantity) VALUES
('Bluetooth Earphones', 129.99, 42),
('Fast Charger', 39.50, 8),
('Gaming Keyboard', 89.00, 0),
('Laptop Stand', 54.95, 23),
('Webcam', 119.00, 5),
('Wireless Headphones', 249.99, 17),
('Wireless Mouse', 45.00, 31),
('Portable Hard Drive', 99.99, 3),
('LED Desk Lamp', 44.00, 0),
('USB Hub', 29.99, 14),

('Phone Case', 15.99, 50),
('Screen Protector', 9.99, 35),
('Power Bank', 59.99, 20),
('USB Cable', 12.99, 45),
('Phone Holder', 18.50, 27),
('Laptop Bag', 39.99, 12),
('Flash Drive 32GB', 14.99, 30),
('Memory Card 128GB', 24.99, 18),
('Bluetooth Speaker', 49.99, 22),
('Smart Watch', 79.99, 10),

('Gaming Mouse', 55.00, 16),
('Mouse Pad', 12.50, 40),
('Keyboard Cover', 8.99, 25),
('HDMI Cable', 10.99, 33),
('Extension Cord', 19.99, 21),
('Electric Fan', 69.99, 7),
('Mini Speaker', 29.99, 15),
('Ring Light', 35.99, 9),
('Tripod Stand', 25.99, 11),
('Laptop Charger', 49.99, 6);
