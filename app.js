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