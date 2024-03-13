const inquirer = require("inquirer");
const db = require("../db/connection");

class Department {
  static viewAllDepartments(callback) {
    db.query("SELECT * FROM department", (err, departments) => {
      if (err) {
        console.error("Error viewing departments:", err);
        callback();
        return;
      }
      console.table(departments);
      callback();
    });
  }

  static addDepartment(callback) {
    inquirer
      .prompt({
        name: "id",
        type: "input",
        message: "Enter the ID of the department:",
      })
      .then((answer) => {
        const departmentId = parseInt(answer.id);

        // Check if the department ID already exists
        db.query(
          "SELECT * FROM department WHERE id = ?",
          [departmentId],
          (err, results) => {
            if (err) {
              console.error("Error checking existing department:", err);
              callback();
              return;
            }

            if (results.length > 0) {
              console.log(
                "Department ID already exists. Please provide a different ID."
              );
              callback();
            } else {
              // Proceed with adding the department if the department ID doesn't exist
              inquirer
                .prompt({
                  name: "name",
                  type: "input",
                  message: "Enter the name of the department:",
                })
                .then((answer) => {
                  const departmentName = answer.name;
                  db.query(
                    "INSERT INTO department (id, name) VALUES (?, ?)",
                    [departmentId, departmentName],
                    (err, result) => {
                      if (err) {
                        console.error("Error adding department:", err);
                        callback();
                        return;
                      }
                      console.log("Department added successfully!");
                      callback();
                    }
                  );
                });
            }
          }
        );
      });
  }

  static deleteDepartment(departmentId, callback) {
    db.query(
      "DELETE FROM department WHERE id = ?",
      [departmentId],
      (err, result) => {
        if (err) {
          console.error("Error deleting department:", err);
          callback();
          return;
        }
        console.log(`Department with ID ${departmentId} deleted successfully!`);
        callback();
      }
    );
  }
}

module.exports = Department;
