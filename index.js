const inquirer = require("inquirer");
const Department = require("./models/department.js");
const Role = require("./models/role.js");
const Employee = require("./models/employee.js"); // Import all modules
const {
  deleteDepartment,
  deleteRole,
  deleteEmployee,
} = require("./deleteFiles"); // Import delete functions
const { startLogo, exitLogo } = require("./logo.js"); // Import start and exit logos

// Starts application
init();

// Helper Function to start application
// displays Ascii-art Logo
function init() {
  startLogo();
  start();
}

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Delete a department",
        "Delete a role",
        "Delete an employee",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View all departments":
          Department.viewAllDepartments(start);
          break;
        case "View all roles":
          Role.viewAllRoles(start);
          break;
        case "View all employees":
          Employee.viewAllEmployees(start);
          break;
        case "Add a department":
          Department.addDepartment(start);
          break;
        case "Add a role":
          Role.addRole(start);
          break;
        case "Add an employee":
          Employee.addEmployee(start);
          break;
        case "Update an employee role":
          Employee.updateEmployeeRole(start);
          break;
        case "Delete a department":
          deleteDepartment(start);
          break;
        case "Delete a role":
          deleteRole(start);
          break;
        case "Delete an employee":
          deleteEmployee(start);
          break;
        case "Exit":
          exitLogo();
          process.exit(0);
      }
    });
}
