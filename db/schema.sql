DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;


CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(9,2),
    department_id INTEGER,
    PRIMARY Key (id)
);

CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY Key (id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

SELECT name 
FROM department 
LEFT JOIN role 
ON department.id = role.department_id;

SELECT title, salary, department_id 
FROM role 
LEFT JOIN department 
ON role.department_id = department.id;

SELECT first_name, last_name, role_id, manager_id 
FROM employee 
JOIN role 
ON employee.role_id = role.department_id;

