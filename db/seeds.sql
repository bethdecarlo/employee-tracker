INSERT INTO department(name)
VALUES
    ("Operations"),
    ("Finance"),
    ("Marketing"),
    ("Research and Development");

INSERT INTO role(title, salary, department_id)
VALUES
    ("Chief Operating Officer", 200000, 1),
    ("Operations Specialist", 60000, 1),
    ("Chief Financial Officer", 160000, 2),
    ("Accountant", 100000, 2),
    ("Sales Lead", 70000, 3),
    ("Marketing Specialist", 50000, 3),
    ("Research Specialist", 60000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ("Bill", "Nye", 1, 1),
    ("Ada", "Lovelace", 2, NULL),
    ("Isaac", "Newton", 3, 2),
    ("George Washington", "Carver", 4, NULL),
    ("Marie", "Curie", 5, 3),
    ("Rosalind", "Franklin", 6, NULL),
    ("Neil", "deGrasse Tyson", 7, NULL);