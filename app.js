//dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

//creates the connection to the employee tracker database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "employee_tracker_db"
});

connection.connect(err => {
    if (err) throw err;
    console.log('now connected to employee_tracker_db!');
    start();
});

//functions

//begings inquierer prompt
function start() {
    inquirer.prompt({
       
        name: "action",
        type: "list",
        message: "Welcome to Employee Tracker! Please select a task.",
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
    //loops through actions 

    }).then((answer) => {
        switch (answer.action) {
            case "View all departments":
                viewDepts();
                break;

            case "View all roles":
                viewRoles();
                break;

            case "View all employees":
                viewEmployees();
                break;

            case "Add a new department":
                addDept();
                break;

            case "Add a new role":
                addRole();
                break;

            case "Add a new employee":
                addEmployee();
                break;

            case "Update an employee's role":
                update();
                break;

            case "Exit app":
                connection.end();
                break;
        }
    });
}



//VIEW
// function to display all departments,

function viewDepts() {
    connection.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.log("Viewing all departments:");
        console.table(data);
        start();
    });
}


//VIEW
// function to display all roles,
function viewRoles() {
    connection.query("SELECT * FROM role", (err, data) => {
        if (err) throw err;
        console.log("Viewing all roles:");
        console.table(data);
        start();
    });
}

//ADD
// function to display all employees,
function viewEmployees() {
    connection.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        console.log("Displaying all employees:");
        console.table(data);
        start();
    });
}

//ADD
//function to add a new department
function addDept() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "Please enter the name of the new department.",
            validate: (value) => {
                if (value) {
                    return true;
                } else {
                    console.log("Try again.");
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
                console.log(`${answer.department} was successfully added.`);
                start();
            }
        );
    });
}

// function to Add a role; prompt role, salary and department
function addRole() {
    const sql = "SELECT * FROM department";
    connection.query(sql, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "Please enter the title of the new role.",
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        console.log("Try again.");
                    }
                }
            },
            {
                name: "salary",
                type: "input",
                message: "Please enter the salary of this role.",
                validate: (value) => {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("Try again.");
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
                message: "Please choose a department for the new role.",
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
                    console.log(`${answer.title} was successfully added as a new role.`);
                    start();
                }
            )
        });
    });
}

//ADD
// function to Add an employee
function addEmployee() {
    const sql = "SELECT * FROM employee, role";
    connection.query(sql, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "Please enter the employee's first name.",
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        console.log("Try again.");
                    }
                }
            },
            {
                name: "lastName",
                type: "input",
                message: "Please enter the employee's last name.",
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        console.log("Try again.");
                    }
                }
            },
            {
                name: "role",
                type: "rawlist",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].title);
                    }
//DEDUPLICATION
// function to remove duplicates in array
                    let dedupeChoiceArray = [...new Set(choiceArray)];
                    return dedupeChoiceArray;
                },
                message: "Please select the employee's role."
            }
        ]).then(answer => {
            let chosenRole;

            for (let i = 0; i < results.length; i++) {
                if (results[i].title === answer.role) {
                    chosenRole = results[i];
                }
            }

            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: chosenRole.id,
                },
                (err) => {
                    if (err) throw err;
                    console.log(`${answer.firstName} ${answer.lastName} was successfully added as a(n) ${answer.role}`);
                    start();
                }
            )
        });
    });
}

//UPDATE
// function to Update employee role
function update() {
    connection.query("SELECT * FROM employee, role", (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "employee",
                type: "rawlist",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].last_name);
                    }
//DEDUPLICATION
// function to remove duplicates in array
                    let dedupeChoiceArray = [...new Set(choiceArray)];
                    return dedupeChoiceArray;
                },
                message: "Please select an employee to update."
            },
            {
                name: "role",
                type: "rawlist",
                choices: () => {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].title);
                    }
//DEDULICATION                 
 // function to remove duplicates in array
  