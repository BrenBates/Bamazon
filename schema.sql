-- Can use snippets from below code in MySQL to start a database that works with the javascript codes.


-- CREATE DATABASE bamazon;
-- DROP DATABASE IF EXISTS bamazon;
USE bamazon;



-- CREATE TABLE products (
--  item_id INT NOT NULL AUTO_INCREMENT,
--  product_name VARCHAR(30),
--  department_name VARCHAR(30),
--  price DECIMAL(10, 2),
--  stock_quantity INT,
-- product_sales DECIMAL(10,2) DEFAULT 0 AFTER stock_quantity;
--  PRIMARY KEY(item_id)

--  )

-- CREATE TABLE departments ( 
-- 	department_id INT NOT NULL AUTO_INCREMENT,
--     department_name VARCHAR(30),
--     over_head_costs DECIMAL(10,2),
--     PRIMARY KEY(department_id)
--     
-- )

-- INSERT INTO products(product_name, department_name, price, stock_quantity)
-- -- VALUES('Playstation 5', 'Electronics', 599.99, 30) 
--   VALUES('Vacuum','Appliances', 99.99, 50);

-- INSERT INTO departments(department_name, over_head_costs)
-- VALUES('Appliances', 32500.00)

-- ALTER TABLE products 
-- ADD COLUMN product_sales DECIMAL(10,2) DEFAULT 0 AFTER stock_quantity;

SELECT * FROM products;
SELECT * FROM departments;

-- SELECT prod.department_name, SUM(prod.product_sales) as product_sales, dept.over_head_costs as over_head_costs, SUM(prod.product_sales) - dept.over_head_costs as total_profit
-- FROM products prod
-- INNER JOIN departments dept ON prod.department_name = dept.department_name
-- GROUP BY department_name;

