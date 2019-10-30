#   View of Functionality:

#   Application Purpose: 
This app uses Node.js and MySQL to create three user interfaces for a simulated store including warehouse quantities and profit.

#   Technologies Used:  MySQL, Javascript, Node.js (node packages: MySQL, Inquirer, Cli-Table)

#   Brennen's Role in Development: All

## User Interface 1: Bamazon Customer 

### Called by:  Running 'node bamazonCustomer.js' in the terminal.

### Description: The Bamazon Customer view logs all of the available items for purchase to the terminal and then asks the user what product ID they would like to purchase using an inquirer prompt.  Next it asks how many units they would like to purchase.  Then it displays the total cost of their purchase and updates the products table in the bamazon MySQL database  by removing the stock that was purchased and adding the total sale to the product sales.