DROP DATABASE IF EXISTS tracker_db;

CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department (
    id INT PRIMARY KEY, name VARCHAR(30) NOT NULL UNIQUE -- to hold department name
);


CREATE TABLE role (
    id INT PRIMARY KEY, title VARCHAR(30), -- to hold role title
    salary DECIMAL, -- to hold role title
    department_id INT, -- to hold reference to department role belongs to
    FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE SET NULL -- if a department is deleted remove the roles
);



CREATE TABLE employee (
    id INT PRIMARY KEY, --   will be used for unique Employee ID.
    first_name VARCHAR(30), -- First Name of employee
    last_name VARCHAR(30), -- Last Name of employee
    role_id INT, -- Holds foreign key referencing roles table, to determine the role
    manager_id INT, --   Holds foreign key referencing employees table, to determine the manager/supervisor
    FOREIGN KEY (role_id) --   this will create a relationship between employee and role, required for proper functioning of application.
    REFERENCES role (id) --   on delete set null will remove the employee
    ON DELETE SET NULL, --  role is removed from the database
    FOREIGN KEY (manager_id) --  create a self-referential fk- able to be an employee's manager or not
    REFERENCES employee (id) -- this allows the employee to refer back to itself as there manager.
    ON DELETE SET NULL
);

