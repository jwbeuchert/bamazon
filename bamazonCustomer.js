var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});
// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "idAndQuantity",
      type: "list",
      message: "What item [ID] and [QUANTITY] would you like?",
      choices: ["ID", "QUANTITY", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.idAndQuantity === "POST") {
        idAuction();
      }
      else if(answer.idAndQuantity === "BID") {
        quantityAuction();
      } else{
        connection.end();
      }
    });
}