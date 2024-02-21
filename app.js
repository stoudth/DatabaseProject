/* -----------CITATION------------------
* All code in the app.js file is taken from the CS340 starter code provided in the Activity 2 page.
* Date: 1/15/2024
* Copied from: CS 340 Activity 2 page
* Source URL: https://canvas.oregonstate.edu/courses/1946034/assignments/9456203?module_item_id=23809270
* -----------END CITATION--------------
*/ 

/*
    SETUP
        -Tells Node.js that we are using express and creating an express instance. The PORT is assigned and 
         db-connector.js is imported.
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 30058;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters


// app.js

app.get('/locations', function(req, res)
    {
        let query1 = "SELECT idLocation, locationName, streetAddress, city, state, zipcode FROM Locations ORDER BY idLocation;";  // Define our query

        db.pool.query(query1, function(error, rows, fields) {  // Execute the query

            res.render('locations', {data:rows});                   // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

app.get('/index', function(req, res)
    {

            res.render('index');                                  // an object where 'data' is equal to the 'rows' we
    });     

app.get('/classes', function(req, res)
    {
        let query1 = "SELECT idClass, className, sizeLimit FROM Classes ORDER BY idClass;";  // Define our query

        db.pool.query(query1, function(error, rows, fields) {  // Execute the query

            res.render('classes', {data:rows});                   // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });     

/*
LISTENER
    -Listens for requests coming in for the PORT number that is assigned in the SETUP section above
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});