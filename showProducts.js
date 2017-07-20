var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "silver63",
    database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

    //first display all of the items available for sale. Include the ids, names, and prices of products for sale
    showAllProducts(); 
});

function showAllProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].item_id + " | " + 
        res[i].product_name + " | " + 
        res[i].department_name + " | " + 
        res[i].price + " | " +
        res[i].stock_quantity);
    }
    console.log("\n\n---------------------------------------------------------------------");

    connection.end();
      
  });
}

