const inquirer = require("inquirer");
const db = require("../db/connection");

class Role {
  static viewAllRoles(callback) {
    db.query(
      "SELECT role.id, title, salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id",
      (err, roles) => {
        if (err) {
          console.error('Error viewing roles:', err);
          callback();
          return;
        }
        console.table(roles);
        callback();
      }
    );
  }

  static addRole(callback) {
    db.query("SELECT * FROM department", (err, departments) => {
      if (err) {
        console.error('Error retrieving departments:', err);
        callback();
        return;
      }

      const departmentChoices = departments.map((department) => ({
        name: department.name,
        value: department.id,
      }));

      inquirer
        .prompt([
          {
            name: "title",
            type: "input",
            message: "Enter the title of the role:",
          },
          {
            name: "salary",
            type: "input",
            message: "Enter the salary for the role:",
          },
          {
            name: "department_id",
            type: "list",
            message: "Select the department for the role:",
            choices: departmentChoices,
          },
        ])
        .then((answer) => {
          const { title, salary, department_id } = answer;

          db.query(
            "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
            [title, salary, department_id],
            (err, result) => {
              if (err) {
                console.error('Error adding role:', err);
                callback();
                return;
              }
              console.log("Role added successfully!");
              callback();
            }
          );
        });
    });
  }

  static deleteRole(roleId, callback) {
    db.query(
      "DELETE FROM role WHERE id = ?",
      [roleId],
      (err, result) => {
        if (err) {
          console.error('Error deleting role:', err);
          callback();
          return;
        }
        console.log("Role deleted successfully!");
        callback();
      }
    );
  }
}

module.exports = Role;
