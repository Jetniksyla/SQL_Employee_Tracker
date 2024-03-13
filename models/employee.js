const db = require("../db/connection");
const inquirer = require("inquirer");

class Employee {
  static viewAllEmployees(callback) {
    db.query(
      `
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
        FROM employee 
        INNER JOIN role ON employee.role_id = role.id 
        INNER JOIN department ON role.department_id = department.id 
        LEFT JOIN employee manager ON employee.manager_id = manager.id`,
      (err, employees) => {
        if (err) throw err;
        console.table(employees);
        callback();
      }
    );
  }

  static addEmployee(callback) {
    db.query("SELECT * FROM role", (err, roles) => {
      if (err) throw err;
      const roleChoices = roles.map((role) => ({
        name: role.title,
        value: role.id,
      }));
      inquirer
        .prompt([
          {
            name: "first_name",
            type: "input",
            message: "Enter the first name of the employee:",
          },
          {
            name: "last_name",
            type: "input",
            message: "Enter the last name of the employee:",
          },
          {
            name: "role_id",
            type: "list",
            message: "Select the role for the employee:",
            choices: roleChoices,
          },
        ])
        .then((answer) => {
          db.query(
            "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)",
            [answer.first_name, answer.last_name, answer.role_id],
            (err, result) => {
              if (err) throw err;
              console.log("Employee added successfully!");
              callback();
            }
          );
        });
    });
  }

  static updateEmployeeRole(callback) {
    db.query("SELECT * FROM employee", (err, employees) => {
      if (err) throw err;
      const employeeChoices = employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));
      db.query("SELECT * FROM role", (err, roles) => {
        if (err) throw err;
        const roleChoices = roles.map((role) => ({
          name: role.title,
          value: role.id,
        }));
        inquirer
          .prompt([
            {
              name: "employee_id",
              type: "list",
              message: "Select the employee to update:",
              choices: employeeChoices,
            },
            {
              name: "role_id",
              type: "list",
              message: "Select the new role for the employee:",
              choices: roleChoices,
            },
          ])
          .then((answer) => {
            db.query(
              "UPDATE employee SET role_id = ? WHERE id = ?",
              [answer.role_id, answer.employee_id],
              (err, result) => {
                if (err) throw err;
                console.log("Employee role updated successfully!");
                callback();
              }
            );
          });
      });
    });
  }

  static deleteEmployee(employeeId, callback) {
    db.query(
      "DELETE FROM employee WHERE id = ?",
      [employeeId],
      (err, result) => {
        if (err) throw err;
        console.log("Employee deleted successfully!");
        callback();
      }
    );
  }
}

module.exports = Employee;
