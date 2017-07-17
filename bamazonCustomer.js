var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "silver63",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("connected as id " + connection.threadId);

//first display all of the items available for sale. Include the ids, names, and prices of products for sale
    connection.query("SELECT * FROM bamazon WHERE artist LIKE '%Haley%'", function(err, res){
        if(err){
            console.log(err);
            connection.end();
        }

        console.log(res);
        //connection.end();
    });

// A query which returns all data for songs sung by a specific artist - WORKS but commented
    // connection.query("SELECT * FROM top5000 WHERE artist LIKE '%Haley%'", function(err, res){
    //     if(err){
    //         console.log(err);
    //         connection.end();
    //     }

    //     console.log(res);
    //     //connection.end();
    // });

// A query which returns all artists who appear within the top 5000 more than once - WORKS but commented
    // connection.query(
    //     "SELECT artist, COUNT(*) count FROM top5000 GROUP BY artist HAVING COUNT(*) > 1;", 
    // function(err, res){
    //     if(err){
    //         console.log(err);
    //         connection.end();
    //     }

    //     console.log(res);
    //     //connection.end();
    // });

// A query which returns all data contained within a specific range - WORKS just commented
    // connection.query(
    //     "SELECT * FROM top5000 WHERE position > 5 AND position < 10;", 
    // function(err, res){
    //     if(err){
    //         console.log(err);
    //         connection.end();
    //     }

    //     console.log(res);
    //     //connection.end();
    // });

// A query which searches for a specific song in the top 5000 and returns the data for it - -WORKS just commented
//     connection.query(
//         "SELECT * FROM top5000 WHERE song = 'White Christmas';", 
//     function(err, res){
//         if(err){
//             console.log(err);
//             connection.end();
//         }

//         console.log(res);
//         //connection.end();
//     });

//     connection.end();
// });
