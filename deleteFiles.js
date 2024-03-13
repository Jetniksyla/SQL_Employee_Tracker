const inquirer = require("inquirer");
const Department = require("./models/department.js");
const Role = require("./models/role.js");
const Employee = require("./models/employee.js");


// Function to handle department deletion
function deleteDepartment(callback) {
  inquirer
    .prompt({
      name: "departmentId",
      type: "input",
      message: "Enter the ID of the department you want to delete:",
    })
    .then((answer) => {
      const departmentId = parseInt(answer.departmentId);
      Department.deleteDepartment(departmentId, callback); // Call the deleteDepartment method
    });
}

// Function to handle role deletion
function deleteRole(callback) {
  inquirer
    .prompt({
      name: "roleId",
      type: "input",
      message: "Enter the ID of the role you want to delete:",
    })
    .then((answer) => {
      const roleId = parseInt(answer.roleId);
      Role.deleteRole(roleId, callback); // Call the deleteRole method
    });
}

// Function to handle employee deletion
function deleteEmployee(callback) {
  inquirer
    .prompt({
      name: "employeeId",
      type: "input",
      message: "Enter the ID of the employee you want to delete:",
    })
    .then((answer) => {
      const employeeId = parseInt(answer.employeeId);
      Employee.deleteEmployee(employeeId, callback); // Call the deleteEmployee method
    });
}

module.exports = { deleteDepartment, deleteRole, deleteEmployee };
