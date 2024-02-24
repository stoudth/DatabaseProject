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

var helpers = require('handlebars-helpers')();    //https://stackoverflow.com/questions/32260117/handlebars-date-format-issue

// app.js

//INDEX

app.get('/index', function(req, res)
    {

            res.render('index');                                  // an object where 'data' is equal to the 'rows' we
    });   



//LOCATIONS

app.get('/locations', function(req, res)
    {
        let query1 = "SELECT idLocation, locationName, streetAddress, city, state, zipcode FROM Locations ORDER BY idLocation;";  // Define our query

        db.pool.query(query1, function(error, rows, fields) {  // Execute the query

            res.render('locations', {data:rows});                   // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query


//CLASSES

app.get('/classes', function(req, res)
    {
        let query1 = "SELECT idClass, className, sizeLimit FROM Classes ORDER BY idClass;";  // Define our query
        let query2 = "SELECT idLocation, locationName from Locations;";
        db.pool.query(query1, function(error, rows, fields) {  // Execute the query
            
            let classes = rows;

            db.pool.query(query2, (error, rows, fields) =>{
                let locations = rows;
                return res.render('classes', {data: classes, locations: locations}); 
            })

                              // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });     

app.post('/add_class', function(req, res)
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
        // Capture NULL values
        let className = data['className'];
    
        let sizeLimit = parseInt(data['sizeLimit']);
        if (isNaN(sizeLimit))
        {
            sizeLimit = 'NULL'
        }

        let location = parseInt(data['locationName'])
        if (isNaN(location))
        {
            location = 'NULL'
        }

        let classDate = (data['classDate'])
        classDate = classDate.replace(/-/g,'')
        classDate = parseInt(classDate)

    
        // Create the query and run it on the database
        query1 = `INSERT INTO Classes(className, sizeLimit) VALUES('${data['className']}', ${sizeLimit})`;
        query2 = `INSERT INTO Sessions(idClass, idLocation, classDate) VALUES((SELECT idClass FROM Classes WHERE className = '${data['className']}'), ${location}, ${classDate})`;

        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
            // presents it on the screen
            else
            {
                db.pool.query(query2, function(error, rows, fields){
                    if (error) {
    
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error)
                        res.sendStatus(400);
                    }
                    else {
                        res.redirect('classes');
                    }
                })
            }
        })
    });

app.delete('/delete-class-ajax/', function(req,res,next){
        let data = req.body;
        console.log(data)
        let idClass = parseInt(data.id);
        console.log(idClass)
        let delete_class = `DELETE FROM Classes WHERE idClass = ?`;

        db.pool.query(delete_class, [idClass], function(error, rows, fields){
            if (error) {
      
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            } else {
            
            console.log('success')
            res.sendStatus(204);
             }
      })});

//SESSIONS

app.get('/sessions', function(req, res)
    {
        let query1 = "SELECT Sessions.idSession AS idSession, Locations.locationName AS locationName, Classes.className AS className, classDate, Classes.sizeLimit As sizeLimit FROM Sessions INNER JOIN Locations ON Sessions.idLocation = Locations.idLocation LEFT JOIN Classes ON Sessions.idClass = Classes.idClass GROUP BY Sessions.idSession ORDER BY Sessions.idSession;";  // Define our query
        let query2 = "SELECT idLocation, locationName from Locations;";
        let query3 = "SELECT idClass, className from Classes;";
        db.pool.query(query1, function(error, rows, fields) {  // Execute the query

            let sessions = rows;

            db.pool.query(query2, function(error, rows, fields){

                let locations  = rows

                db.pool.query(query3, function(error, rows, fields){

                    let classes = rows
                    res.render('sessions', {data:sessions, locations:locations, classes: classes})
                })
            })
        })                                          
    });  

app.get('/delete', function(req, res) {   

            return res.render('delete');                   // Render the index.hbs file, and also send the renderer
                                                     // an object where 'data' is equal to the 'rows' we
    });  

app.put('/update-session', function(req, res) {
    console.log('success')

    let data = req.body
    let id = parseInt(data.id)
    let location_id = parseInt(data.location)
    let class_id = parseInt(data.class)
    let hyphenDate = (data.date)
    let classDate = hyphenDate.replace(/-/g,'')
    classDate = parseInt(classDate)

    query1 = `UPDATE Sessions SET idLocation = ${location_id},  idClass = ${class_id}, classDate = ${classDate} WHERE idSession = ${id};`;
    query2 = `SELECT Sessions.idSession AS idSession, Locations.locationName AS locationName, Classes.className AS className, classDate, Classes.sizeLimit AS sizeLimit FROM Sessions INNER JOIN Locations ON Sessions.idLocation = Locations.idLocation LEFT JOIN Classes ON Sessions.idClass = Classes.idClass WHERE Sessions.idSession = ${id};`;

    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {

            db.pool.query(query2, function(error, rows, fields) {
                let data = JSON.stringify(rows)
                console.log(rows)
                res.send(rows)
            })
            

        }
    })
});


/*
LISTENER
    -Listens for requests coming in for the PORT number that is assigned in the SETUP section above
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});