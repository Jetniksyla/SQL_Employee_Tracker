DROP DATABASE IF EXISTS tracker_db;

CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(30) NOT NULL UNIQUE -- to hold department name
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Auto-incrementing primary key
    title VARCHAR(30), -- to hold role title
    salary DECIMAL, -- to hold role salary
    department_id INT, -- to hold reference to department role belongs to
    
    FOREIGN KEY (department_id) 
    REFERENCES department (id) 
    ON DELETE SET NULL -- if a department is deleted remove the roles
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Auto-incrementing primary key
    first_name VARCHAR(30), -- First Name of employee
    last_name VARCHAR(30), -- Last Name of employee
    role_id INT, -- Holds foreign key referencing roles table, to determine the role
    manager_id INT, -- Holds foreign key referencing employees table, to determine the manager/supervisor
    
    FOREIGN KEY (role_id)
    REFERENCES role (id)
    ON DELETE SET NULL, -- role is removed from the database
    
    FOREIGN KEY (manager_id)
    REFERENCES employee (id)
    -- No ON DELETE SET NULL here, as it might not make sense to set manager's ID to NULL
);
