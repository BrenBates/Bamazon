var mysql = require("mysql");
var inquirer = require("inquirer");
let idArr = [];
let itemArr = [];
let priceArr = [];
let salesArr = [];
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

    readProducts();

});

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        //   console.log(res);


        for (let i = 0; i < res.length; i++) {
            if (res[i].stock_quantity > 0) {
                idArr.push(res[i].item_id);
                itemArr.push(res[i].product_name);
                priceArr.push(res[i].price);
                quantityArr.push(res[i].stock_quantity);
                salesArr.push(res[i].product_sales);
            }
        }

        console.log('Items Available For Purchase');
        console.log('---------------------------')
        for (let i = 0; i < idArr.length; i++) {
            console.log('Item ID: ' + idArr[i]);
            console.log('Item: ' + itemArr[i]);
            console.log('Price: $' + priceArr[i]);
            console.log('---------------------------')
        }


        purchase();
    });
}

function purchase() {
    inquirer.prompt([{
            message: "What is the ID of the product you would like to buy?",
            type: "input",
            name: "buyID"
        },
        {
            message: "How many units would you like to purchase?",
            type: "input",
            name: "buyUnits"

        }
    ]).then(function (answer) {


        for (let i = 0; i < idArr.length; i++) {
            if (answer.buyID == idArr[i]) {

                if (answer.buyUnits > quantityArr[i]) {
                    console.log('Insufficient quantity!');
                } else {

                    let newQuantity = quantityArr[i] - answer.buyUnits;
                    let prodSales = salesArr[i] + parseInt(answer.buyUnits)*priceArr[i]; 

                    console.log('these are the prod sales: ' +prodSales);

                    let query = connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [{
                                stock_quantity: newQuantity,
                                product_sales: prodSales
                            },
                            {
                                item_id: idArr[i]
                            },
                            
                        ],
                        function (err, res) {
                            if (err) throw err;
                            // console.log(res.affectedRows + " products updated!\n");
                        }
                    )

                    console.log('Thank you!  The total cost of your purchase was $' + (priceArr[i] * answer.buyUnits).toFixed(2));
                    connection.end();
                }

            }
        }

    })

}