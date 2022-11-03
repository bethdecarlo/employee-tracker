// node dependencies
const figlet = require("figlet");
const mysql = require("mysql");
const inquirer = require("inquirer");

//title of app... powered by figlet!
figlet("Welcome to \n \n Employee \n \n Tracker!", (err, data) => {
    if (err) throw err;
    console.log(data);
})

//function to connect to database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "rootroot",
    database: "employee_tracker_db"
});

connection.connect(err => {
    if (err) throw err;
    console.log('successfully connected to employee_tracker_db');
    start();
});

// begins inquierer prompt
function start() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a new department",
            "Add a new role",
            "Add a new employee",
            "Update an employee's role",
            "Exit app"
    ]

        // loops through prompt choices
     }).
        then((answer) => {
            switch (answer.action) {
                case "View all departments":
                    viewDepts();
                    break;
    
                case "View all roles":
                    viewRoles();
                    break;
    
                case "View all employees":
                    viewEes();
                    break;
    
                case "Add a department":
                    addDept();
                    break;
    
                case "Add a role":
                    addRole();
                    break;
    
                case "Add an employee":
                    addEe();
                    break;
    
                case "Update employee role":
                    update();
                    break;
    
                case "Exit":
                    connection.end();
                    break;
            }
        });
    }
    
// function to display all departments,
function viewAllDepts() {
    connection.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.log("Now viewing all departments:");
        console.table(data);
        start();
    });
}

// function to display all roles,
function viewAllRoles() {
    connection.query("SELECT * FROM role", (err, data) => {
        if (err) throw err;
        console.log("Now viewing all roles:");
        console.table(data);
        start();
    });
}

// function to display all employees,
function viewAllEmployees() {
    connection.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        console.log("Now viewing all employees:");
        console.table(data);
        start();
    });
}