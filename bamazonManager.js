var mysql = require("mysql");
var inquirer = require("inquirer");
let idArr = [];
let itemArr = [];
let priceArr = [];
let quantityArr = [];

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

    showMenu();
});

let showMenu = function(){
    let menuItems = ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'End Session']; 

    inquirer.prompt(  
        [{
        name: 'MainMenu',
        type: 'list',
        choices: menuItems
        }]).then( function(answer) {

            if(answer.MainMenu === 'View Products for Sale'){
                prodForSale();
            }

            if(answer.MainMenu === 'View Low Inventory'){
                lowInventory();
            }

            if(answer.MainMenu === 'Add to Inventory'){
                addInventory();
            }

            if(answer.MainMenu === 'Add New Product'){
                addNewProduct();
            }

            if(answer.MainMenu === 'End Session'){
                endSession();
            }



        })
    }

    function prodForSale(){
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            idArr = [];
            itemArr = [];
            priceArr = [];
            quantityArr = [];
    
            for (let i = 0; i < res.length; i++) {
                if (res[i].stock_quantity > 0) {
                    idArr.push(res[i].item_id);
                    itemArr.push(res[i].product_name);
                    priceArr.push(res[i].price);
                    quantityArr.push(res[i].stock_quantity);
                }
            }
    
            console.log('Products Available For Sale');
            console.log('---------------------------')
            for (let i = 0; i < idArr.length; i++) {
                console.log('Item ID: ' + idArr[i]);
                console.log('Item: ' + itemArr[i]);
                console.log('Price: $' + priceArr[i]);
                console.log('Qty Remaining: ' + quantityArr[i]);
                console.log('---------------------------')
            }
            
            showMenu();

        });
    }

    function lowInventory(){
        connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
            if (err) throw err;

            idArr = [];
            itemArr = [];
            priceArr = [];
            quantityArr = [];
    
            for (let i = 0; i < res.length; i++) {
                if (res[i].stock_quantity > 0) {
                    idArr.push(res[i].item_id);
                    itemArr.push(res[i].product_name);
                    priceArr.push(res[i].price);
                    quantityArr.push(res[i].stock_quantity);
                }
            }
    
            console.log('Low Inventory Products');
            console.log('---------------------------')
            for (let i = 0; i < idArr.length; i++) {
                console.log('Item ID: ' + idArr[i]);
                console.log('Item: ' + itemArr[i]);
                console.log('Price: $' + priceArr[i]);
                console.log('Quantity Remaining: ' + quantityArr[i]);
                console.log('---------------------------')
            }
            
            showMenu();

        });
        
    }

    function addInventory(){
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            idArr = [];
            itemArr = [];
            priceArr = [];
            quantityArr = [];
    
            for (let i = 0; i < res.length; i++) {
                if (res[i].stock_quantity > 0) {
                    idArr.push(res[i].item_id);
                    itemArr.push(res[i].product_name);
                    priceArr.push(res[i].price);
                    quantityArr.push(res[i].stock_quantity);
                }
            }
    
                inquirer.prompt([{
                    message: "What is the ID of the product you would like to add inventory for?",
                    type: "input",
                    name: "addID"
                },
                {
                    message: "How many units would you like to add?",
                    type: "input",
                    name: "addUnits"

                }
            ]).then(function (answer) {

                
                for(let i = 0; i < idArr.length; i++) {
    
                    if(parseInt(answer.addID) === idArr[i]){
                        

                        let newQty = quantityArr[i] + parseInt(answer.addUnits);
                      

                connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: newQty
                    },
                    {
                        item_id: parseInt(answer.addID)
                    }
                ],
                function(err,res){
                    if (err) throw err;
                    console.log(res.affectedRows + " products updated!\n");
                });
                showMenu();
            }}
            
        });
    })};


    function addNewProduct(){


        inquirer.prompt([
            {type: 'input',
            message: 'What is the name of the item you would like to add?',
            name: 'addProduct'
            },
            {
                type: 'input',
                message: "What department does this item belong to?",
                name: 'addDept'
            },
           
            {
            type: 'input',
            message: 'What price would you like to set for the item?',
            name: 'addPrice'
            },

            {
            type: 'input',
            message: 'What is the stock quantity?',
            name: 'addStock'
            }
        ]).then(function(answer){

            connection.query('INSERT INTO products SET ?',
            {
                product_name: answer.addProduct,
                department_name: answer.addDept,
                price: answer.addPrice,
                stock_quantity: answer.addStock
            },
            function(err,res) {
                if(err) throw err;
                console.log(res.affectedRows + " product inserted\n");
                showMenu();
            });

        })

     
        
    }

    function endSession(){
        connection.end();
    }






 