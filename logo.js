const logo = require("asciiart-logo");

// creates actual logo
function startLogo() {
  console.log(
    logo({
      name: "Employee Tracker",
      font: "Big",
      lineChars: 7,
      padding: 2,
      margin: 1,
      logoColor: "cyan",
      textColor: "green",
    }).render()
  );
}

function exitLogo() {
  console.log(
    logo({
      name: "Thank You! Good Bye!",
      font: "Big",
      lineChars: 10,
      padding: 2,
      margin: 3,
      borderColor: "grey",
      logoColor: "cyan",
      textColor: "green",
    }).render()
  );
}

module.exports = { startLogo, exitLogo };
