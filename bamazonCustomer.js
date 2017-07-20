var mysql = require("mysql");
var inquirer = require("inquirer");

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

    // The app should then prompt users with two messages.
        // The first should ask them the ID of the product they would like to buy. 
        promptForID();
      
  });
}

function promptForID() {
  inquirer
    .prompt({
      name: "ID",
      type: "input",
      message: "\nEnter the ID of the product you would like to buy: ",
    })
    .then(function(answer) {
          console.log("ID is: " + answer.ID);
          
          // The second message should ask how many units of the product they would like to buy.
          promptForQty(answer.ID);
      
    });
}

function promptForQty(id) {
  inquirer
    .prompt({
      name: "qty",
      type: "input",
      message: "\nEnter the quantity of the product you would like to buy: ",
    })
    .then(function(answer) {
        
        console.log("\nSelected product was: " + id);
        console.log("\nRequested purchase amount is: " + answer.qty);

        updateStockQuantity(id, answer.qty);

    });
}

function updateStockQuantity(id, qty){

      var new_stock_qty = 0;
      var qtyInt = parseInt(qty);

      var targetStockQty = "SELECT stock_quantity FROM products WHERE item_id = " + id;
      connection.query(targetStockQty, function(err,res) {
                if (err) 
                {
                  throw err;
                }
                else
                {
                  new_stock_qty = res[0].stock_quantity -= qtyInt;

                  updateQuantity(id, new_stock_qty);
                }  
      });
}

function updateQuantity(id, newQty){

                var newQtyInt = parseInt(newQty);

                if (newQtyInt >= 0) 
                  {
                    var updateStockQty = "UPDATE products SET stock_quantity = " + newQtyInt + " WHERE item_id = " + id;

                    connection.query(updateStockQty, function(err,res) {
                      if (err)
                      { 
                        throw err;
                      }
                      else
                      {
                        console.log("\nYou products have been purchased and will be shipped to you soon!");
                      }
                    });
                  }
                  else
                  {
                      console.log("\nINSUFFICIENT QUANTITY - No soup for you!!!");
                  } //end new_stock_qty if

                  connection.end();
}