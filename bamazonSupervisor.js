var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');



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

let showMenu = function () {

    let menuItems = ['View Product Sales by Department', 'Create New Department'];

    inquirer.prompt(
        [{
            name: 'MainMenu',
            type: 'list',
            choices: menuItems
        }]).then(function (answer) {

        if (answer.MainMenu === 'View Product Sales by Department') {
            prodSales();
        }

        if (answer.MainMenu === 'Create New Department') {
            newDepartment();
        }

        if (answer.MainMenu === 'End Session') {
            endSession();
        }

    })

}

function endSession() {
    console.log('Connection Ended')
    connection.end();
}

function prodSales() {

    connection.query("SELECT prod.department_name, SUM(prod.product_sales) as product_sales, dept.over_head_costs as over_head_costs, SUM(prod.product_sales) - dept.over_head_costs as total_profit FROM products prod INNER JOIN departments dept ON prod.department_name = dept.department_name GROUP BY department_name;", function (err, res) {
        if (err) throw err;
        //  console.log(res);
        var table = new Table({
            head: ['department_name', 'product_sales', 'over_head_costs', 'total_profit']
        });


        for (let i = 0; i < res.length; i++) {

            table.push(
                [
                    res[i].department_name,
                    res[i].product_sales,
                    res[i].over_head_costs,
                    res[i].total_profit
                ]);

        }

        console.log(table.toString());
        endSession();

    })



}

function newDepartment() {

    inquirer.prompt([{
            message: "What is the department name you would like to add?",
            type: 'input',
            name: 'deptName'
        },
        {
            message: "What are the overhead costs?",
            type: 'input',
            name: 'overHead'
        }
    ]).then(function (answer) {
     
        console.log(answer);

        connection.query('INSERT INTO departments SET ?',
        {
            department_name: answer.deptName,
            over_head_costs: answer.overHead
        }, 
        function(err,res){
            if(err) throw err;
            console.log(res.affectedRows + " department inserted\n");
            endSession();

    })});


}