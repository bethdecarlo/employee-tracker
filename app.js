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
    port: 3306,
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
                    viewAllDepts();
                    break;
    
                case "View all roles":
                    viewAllRoles();
                    break;
    
                case "View all employees":
                    viewAllEmployees();
                    break;
    
                case "Add a department":
                    addNewDept();
                    break;
    
                case "Add a role":
                    addNewRole();
                    break;
    
                case "Add an employee":
                    addNewEmployee();
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

//function to add a new department
function addNewDept() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "What is the name of the new department?",
            validate: (value) => {
                if (value) {
                    return true;
                } else {
                    console.log("Try again. Department name not added.");
                }
            }
        },
    ]).then(answer => {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.department
            },
            (err) => {
                if (err) throw err;
                console.log(`New department called ${answer.department} was successfully added.`);
                start();
            }
        );
    });
}

//function that will add new role 
// loops through prompting new role, role's salary, and role's department

function addNewRole() {
    const sql = "SELECT * FROM department";
    connection.query(sql, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the name of the new role?",
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        console.log("Try again. New role not added.");
                    }
                }
            },
            {
                name: "salary",
                type: "input",
                message: "What is this role's salary?",
                validate: (value) => {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("Try again. Please enter a number value for the salary.");
                }
            },
            {
                name: "department",
                type: "rawlist",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].name);
                    }
                    return choiceArray;
                },
                message: "What department will this new role be in?",
            }
        ]).then(answer => {
            let chosenDept;
            for (let i = 0; i < results.length; i++) {
                if (results[i].name === answer.department) {
                    chosenDept = results[i];
                }
            }

            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: chosenDept.id
                },
                (err) => {
                    if (err) throw err;
                    console.log(`New role ${answer.title} has been added!`);
                    start();
                }
            )
        });
    });
}