#   Technologies Used:  
MySQL, Javascript, Node.js (node packages: MySQL, Inquirer, Cli-Table)

#   Brennen's Role in Development: 
All

#   Video of Functionality:

#   Application Purpose: 
This app uses Node.js and MySQL to create three user interfaces for a simulated store including warehouse quantities and profit.  In order to run this app, you must set up a database in MySQL titled bamazon with a table named products and a table named departments.  You would also need to run an npm install to install the necessary node packages that are listed in the package.json file.

## User Interface 1: Bamazon Customer 

### Called by:  Running 'node bamazonCustomer.js' in the terminal.

### Description: 
The Bamazon Customer view logs all of the available items for purchase to the terminal and then asks the user what product ID they would like to purchase using an inquirer prompt.  Next it asks how many units they would like to purchase.  Then it displays the total cost of their purchase and updates the products table in the bamazon MySQL database  by removing the stock that was purchased and adding the total sale to the product sales.

## User Interface 2: Bamazon Manager

### Called by:  Running 'node bamazonManager.js' in the terminal.

### Description:  
The Bamazon Manager view starts by displaying a menu that contains the following items: 

View Products for Sale
View Low Inventory
Add to Inventory
Add New Product
End Session

The first four use various queries to the MySQL database to perform functions.   View products for sale is a simple query.  View low inventory is a query with a where statement to see allt he product with a stock quantity less than 5.  Add to inventory allows you to select a product and then tell it how many more units to add to the inventory.  Add new product allows you to insert a new product into the database by giving it the item name, department, price and stock quantity to add.  When you are done with the manager view you can end your session using End Session.


## User Interface 3: Bamazon Supervisor

### Called by:  Running 'node bamazonSupervisor.js' in the terminal.

### Description:  
The Bamazon Supervisor view starts by displaying a menu that contains the following items: 

View Product Sales by Department
Create New Department

View Product Sales by Department utilizes a SQL Select statement that uses the group by command and an inner join to combine the departments and product tables to provide a concise table view of total profit by department.  This table is logged to the console using the Cli-Table node.js package.  Example:
┌─────────────────┬───────────────┬─────────────────┬──────────────┐
│ department_name │ product_sales │ over_head_costs │ total_profit │
├─────────────────┼───────────────┼─────────────────┼──────────────┤
│ Electronics     │ 20000         │ 20000           │ 0            │
├─────────────────┼───────────────┼─────────────────┼──────────────┤
│ Outdoors        │ 30000         │ 50000           │ -20000       │
├─────────────────┼───────────────┼─────────────────┼──────────────┤
│ Clothing        │ 20000         │ 12500           │ 7500         │
├─────────────────┼───────────────┼─────────────────┼──────────────┤
│ Appliances      │ 40199.98      │ 32500           │ 7699.98      │
└─────────────────┴───────────────┴─────────────────┴──────────────┘

Create New Department uses a SQL query to add a new department row to the departments table.
