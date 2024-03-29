/* -----------SETUP CITATION------------------
* Most of the below code is copied from the Node.js Starter App referenced and linked to in this course. Specifically taken from Steps 1 and Steps 3. 
* Date: Express setup and Database Connection originally accessed 1/15/2024 (Step1) - Handlebar Setup accessed starting 2/21/2024 (Step 3)
* Copied from: GitHub: osu-cs340-ecampus/nodejs-starter-app (Step 1 and Step 3)
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* -----------END CITATION--------------
*/ 
/*
    SETUP
        -Tells Node.js that we are using express and creating an express instance. The PORT is assigned and 
         db-connector.js is imported. Imports Handlebars, creates a handlebar instance, and tells express to use handlebars.
*/
// Express - Node.js Starter App Step 1

// Express
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT = 30071;

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

//** ROUTES - Handles routing for the incoming requests and responses and handles requests to the SQL database **/



/*---------------------INDEX--------------------------*/


/* -----------INDEX ROUTE CITATION------------------
* The below route handler for the Index page was copied from Step 3 of the Node.js Start App provided in this course
* Date: 2/21/2024
* Copied from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 3
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* 
* Description of function: Handles route requests and responses for the index.hbs page - Renders the index page
* -----------END CITATION--------------
*/ 


app.get('/', function(req, res){

        res.render('index');    

   });   



/*---------------------LOCATIONS--------------------------*/


/* -----------LOCATIONS GET ROUTE CITATION------------------
* The below route handler for the Locations page was copied and adpated from Step 4 of the Node.js Start App provided in this course
* Date: 2/21/2024
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 4
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* 
* Description of function: Handles Get requests and responses for the locations.hbs page - Renders the Locations page with Location data from the SQL Database
* NOTE: The SQL query 'get_locations' is of our own creation
* -----------END CITATION--------------
*/            
   
app.get('/locations', function(req, res) {  
    //Define query
    let getLocation = "SELECT idLocation, locationName, streetAddress, city, state, zipcode FROM Locations;";              

    //Executre query
    db.pool.query(getLocation, function(error, rows, fields){

        // Render the index.hbs file, and also send the renderer an object where 'data' is equal to the 'rows' we
        res.render('locations', {data: rows});                  
    })                                                   
}); 


/* -----------LOCATIONS POST CITATION------------------
* The below route handler for the Locations page was adapted from Step 5 of the Node.js Start App provided in this course
* Date: 2/25/2024
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 5
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* 
* Description of function: Handles Post requests and responses for the locations.hbs page - Adds rows containing designated attributes to Locations page with Location data from the SQL Database
* -----------END CITATION--------------
*/       

app.post('/add-location-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
   
    // Create the query and run it on the database
    query1 = `INSERT INTO Locations (locationName, streetAddress, city, state, zipcode) VALUES ('${data.locationName}', '${data.streetAddress}', '${data.city}', '${data.state}', '${data.zipcode}')`;
        
    db.pool.query(query1, function(error, rows, fields){
       
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);

        } else {

            // If there was no error, perform second query to get all locations
            query2 = `SELECT * FROM Locations;`;
            db.pool.query(query2, function(error, rows, fields){
       
                // If there was an error on the second query, send a 400
                if (error) {
                           
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);

                } else {

                    // Send second query result back
                    res.send(rows);

                };
            })
        };
    })
});


/* -----------LOCATIONS DELETE CITATION------------------
* The below route handler for the Locations page was adapted from Step 7 of the Node.js Start App provided in this course
* Date: 2/25/2024
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 7
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* 
* Description of function: Handles Delete requests and responses for the locations.hbs page - Deletes specified rows from both Locations page and from the SQL Database
* -----------END CITATION--------------
*/       

app.delete('/delete-location-ajax/', function(req,res,next){

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let locationID = parseInt(data.idLocation)

    //define query and Cascade will take care of Sessions and Routes tables
    let deleteLocation = `DELETE FROM Locations WHERE idLocation = ?`; 

    // Run the delete query
    db.pool.query(deleteLocation, [locationID], function(error, rows, fields){
        if (error) {
     
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);

        } else {     

               res.sendStatus(204);  

        };     
    })
});


/* -----------LOCATIONS UPDATE CITATION------------------
* The below route handler for the Locations page was adapted from Step 8 of the Node.js Start App provided in this course
* Date: 2/25/2024
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 8
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* 
* Description of function: Handles Update requests and responses for the locations.hbs page - Updates specified rows in Locations table
* -----------END CITATION--------------
*/            

app.put('/put-location-ajax', function(req,res,next){

    //Capture incoming data and parse
    let data = req.body;
    let location = parseInt(data.locationName);
    let address = data.streetAddress;
    let city = data.city;
    let state = data.state;
    let zipcode = data.zipcode;
       
    //Define SQL queries
    let queryUpdateAddress = `UPDATE Locations SET streetAddress = '${address}', city = '${city}', state = '${state}', zipcode = '${zipcode}' WHERE idLocation = ${location}`;
    let selectAddress = `SELECT * FROM Locations WHERE Locations.idLocation = ?`;
       
    // Run the 1st query
    db.pool.query(queryUpdateAddress, function(error, rows, fields){
        if (error) {
       
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
   
        } else {

            // Run the second query
            db.pool.query(selectAddress, [location], function(error, rows, fields) {
           
                if (error) {

                    //Capture errors and log to terminal and send 400 response to indicate bad request
                    console.log(error);
                    res.sendStatus(400);

                } else {

                    //Send data as response if query to database was successful
                    res.send(rows);

                }
            })
        }
    })
});



/*---------------------CLASSES--------------------------*/


/* -----------CLASSES GET ROUTE CITATION------------------
* The below route handler for the Classes page was adpated from Step 4 of the Node.js Start App provided in this course
* Date: 2/21/2024
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 4
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* 
* Description of function: Handles Get requests and responses for the classes.hbs page -  Renders the Classes page with Classes data from the SQL Database
*                     It also queries information from the database to create dropdown selections for Locations in some forms on the page
* NOTE: The SQL query 'get_classes' and 'location_dropdown are of our own creation
* -----------END CITATION--------------
*/ 

app.get('/classes', function(req, res) {    

    //Define SQL queries
    let get_classes = "SELECT idClass, className, sizeLimit FROM Classes;";
    let location_dropdown = "SELECT idLocation, locationName from Locations;";

    //Get the class data
    db.pool.query(get_classes, function(error, rows, fields) {
           
        let classes = rows;

        //Get data location data for dropdown and send for rendering
        db.pool.query(location_dropdown, (error, rows, fields) => {

            let locations = rows;

            return res.render('classes', {data: classes, locations: locations}); 

        });             
    });
});     



/* -----------CLASSES POST/ADD_CLASS ROUTE CITATION------------------
* The below route handler for the Classes page was adpated from Step 5 of the Node.js Start App provided in this course
* Date: 2/22/2024
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 5
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* 
* Description of function: Handles Post requests and responses for the classes.hbs page to add a new class to the database- Inserts a new class into the database and rerenders classes page to show update
*                     It also inserts the first session of said class into the Session table in the databse
* NOTE: The SQL query 'add_class' and 'add_session' are of our own creation
*
* -------------Hyphen Removal Citation-----------------
* The below code that removes hypens from the dates was copied from the answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
* Date: 2/22/2024
* Copied from answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
* Source URL: https://stackoverflow.com/questions/6204867/fastest-way-to-remove-hyphens-from-a-string
* Authors: James Hill
* -----------END CITATION--------------
*/ 

app.post('/add_class', function(req, res) {

    //Pull out and format data from request 
    let data = req.body;
    let className = data.className;
    let sizeLimit = parseInt(data.sizeLimit);
    let location = parseInt(data.locationName)
    let classDate = (data.classDate)

    //See hyphen removal citation
    classDate = classDate.replace(/-/g,'') 
    classDate = parseInt(classDate)

   
    // Database Insert Queries
    let add_class = `INSERT INTO Classes(className, sizeLimit) VALUES('${className}', ${sizeLimit})`;
    let add_session = `INSERT INTO Sessions(idClass, idLocation, classDate) VALUES((SELECT idClass FROM Classes WHERE className = '${className}'), ${location}, ${classDate})`;

    //Add new class and handle errors
    db.pool.query(add_class, function(error, rows, fields){
        if (error) {
   
            console.log(error);
            res.sendStatus(400);

        //If no error, add session and handle errors
        } else {

            db.pool.query(add_session, function(error, rows, fields){
                if (error) {
   
                       console.log(error)
                       res.sendStatus(400);
                   
                   //If no error, reload classes page
                } else {

                    res.redirect('classes');

                };
            });
        };
    });
});


/* -----------CLASSES DELETE ROUTE CITATION------------------
* The below route handler for the Classes page was adpated from Step 7 of the Node.js Start App provided in this course
* Date: 2/23/2024
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 7
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* 
* Description of function: Handles Delete requests and responses for the classes.hbs page - Sends a 204 response if deletion from database was successful
* NOTE: The SQL query 'delete_class' is of our own creation
* -----------END CITATION--------------
*/ 

app.delete('/delete-class-ajax/', function(req, res, next) {

    //data from request
    let data = req.body;
    let idClass = parseInt(data.id);

    //Delete query to be sent to database
    let delete_class = `DELETE FROM Classes WHERE idClass = ?`;

    //Query sent to database to delete class - handles errors - if no error, sends a 204 response
    db.pool.query(delete_class, [idClass], function(error, rows, fields){
        if (error) {
    
            console.log(error);
            res.sendStatus(400);

        } else {
           
            //send successful status
            res.sendStatus(204);

        };
    });
});



/*---------------------SESSIONS--------------------------*/


/* -----------SESSIONS GET ROUTE CITATION------------------
* The below route handler for the Sessions page was adpated from Step 4 of the Node.js Start App provided in this course
* Date: 2/21/2024
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 4
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* 
* Description of function: Handles Get requests and responses for the sessions.hbs page - Renders the Sessions page with Sessions data from the SQL Database
*                     It also queries information from the database to create dropdown selections for Locations and Classes in some forms on the page
* NOTE: The SQL query 'get_sessions', 'class_drowdown', and 'location_dropdown' are of our own creation
* -----------END CITATION--------------
*/ 

app.get('/sessions', function(req, res) {
    //Database queries - Gets session data, location data, and class data
    let get_sessions = "SELECT Sessions.idSession AS idSession, Locations.locationName AS locationName, Classes.className AS className, DATE_FORMAT(classDate, '%Y-%m-%d') AS classDate, Classes.sizeLimit As sizeLimit FROM Sessions INNER JOIN Locations ON Sessions.idLocation = Locations.idLocation LEFT JOIN Classes ON Sessions.idClass = Classes.idClass GROUP BY Sessions.idSession;"; 
    let location_dropdown = "SELECT idLocation, locationName from Locations;";
    let class_dropdown = "SELECT idClass, className from Classes;";

    //Gets Sessions for display when page is rendered
    db.pool.query(get_sessions, function(error, rows, fields) {

        let sessions = rows;

        //Gets location data for dropdown 
        db.pool.query(location_dropdown, function(error, rows, fields){

            let locations  = rows;

            //Gets class data for dropdown
            db.pool.query(class_dropdown, function(error, rows, fields){

                let classes = rows;
                res.render('sessions', {data:sessions, locations:locations, classes: classes});
            });
        });
    });                                   
});  


/* -----------SESSIONS PUT/UPDATE-SESSION ROUTE CITATION------------------
* The below route handler for the Sessions page was adpated from Step 8 of the Node.js Start App provided in this course
* Date: 2/23/2024
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 8
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* 
* Description of function: Handles Put requests and responses for the session.hbs page updates a sessions info in the database - Updates the Sesions info and then gets the new sessions data to return to be rendered on the page
* NOTE: The SQL query 'add_class' and 'add_session' are of our own creation
*
* -------Hyphen Removal Citation------------
* The below code that removes hypens from the dates was copied from the answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
* Date: 2/22/2024
* Syntax Copied from answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
* Source URL: https://stackoverflow.com/questions/6204867/fastest-way-to-remove-hyphens-from-a-string
* Authors: James Hill
* -----------END CITATION--------------
*/ 

app.put('/update-session', function(req, res) {

    //Pulls info for update from request
    let data = req.body
    let id = parseInt(data.id)
    let location_id = parseInt(data.location)
    let class_id = parseInt(data.class)
    let hyphenDate = (data.date)

    //See hyphen removal citation
    let classDate = hyphenDate.replace(/-/g,'')
    classDate = parseInt(classDate)

    //Database queries - Update Session and Pull updated session info from database(for classSize)
    let update_session = `UPDATE Sessions SET idLocation = ${location_id},  idClass = ${class_id}, classDate = ${classDate} WHERE idSession = ${id};`;
    let new_session_info = `SELECT Sessions.idSession AS idSession, Locations.locationName AS locationName, Classes.className AS className, classDate, Classes.sizeLimit AS sizeLimit FROM Sessions INNER JOIN Locations ON Sessions.idLocation = Locations.idLocation LEFT JOIN Classes ON Sessions.idClass = Classes.idClass WHERE Sessions.idSession = ${id};`;

    //Queries database to update session and handles any errors
    db.pool.query(update_session, function(error, rows, fields){
        if (error) {

            console.log(error)
            res.sendStatus(400);

        //Gets updated session info from database and returns that info to requester
        } else {
            db.pool.query(new_session_info, function(error, rows, fields) {

                res.send(rows)

            });
        };
    });
});


/* -----------ROUTES POST/ADD_SESSION SESSION CITATION------------------
* The below route handler for the Sessions page was adpated from Step 5 of the Node.js Start App provided in this course
* Date: 2/22/2024
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 5
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* 
* Description of function: Handles Post requests and responses for the sessions.hbs page to add a new session to the database- Inserts a new session into the database and sends back added data
* NOTE: The SQL query 'add_session' is of our own creation
*
* -Hyphen Removal Citation
* The below code that removes hypens from the dates was copied from the answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
* Date: 2/22/2024
* Syntax Copied from answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
* Source URL: https://stackoverflow.com/questions/6204867/fastest-way-to-remove-hyphens-from-a-string
* Authors: James Hill
* -----------END CITATION--------------
*/ 

app.post('/add-session', function(req, res) {

    //Pull out and format data from request 
    let data = req.body;
    let idLocation = parseInt(data.locationName)
    let idClass = parseInt(data.className)
    let classDate = parseInt((data.classDate).replace(/-/g,''));

    // Database Insert Queries
    let add_session = `INSERT INTO Sessions(idLocation, idClass, classDate) VALUES (${idLocation}, ${idClass}, ${classDate});`
    
    //Add new session and handle errors
    db.pool.query(add_session, function(error, rows, fields){
        if (error) {
   
            console.log(error);
            res.sendStatus(400);
                   
        //If no error, reload sessions page
        } else {
            res.redirect('sessions')
        };
    });
});



/*---------------------ROUTES--------------------------*/


/* -----------ROUTES GET ROUTE CITATION------------------
* The below route handler for the Routes page was adpated from Step 4 of the Node.js Start App provided in this course
* Date: 2/21/2024
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 4
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* 
* Description of function: Handles Get requests and responses for the routes.hbs page - Renders the Routes page with Routes data from the SQL Database
*                     It also queries information from the database to create dropdown selections for Locations, RouteSetters, and RouteTypes in some forms on the page
* NOTE: The SQL query 'get_routes', 'routesetter_drowdown', 'routetype_dropdown, and 'location_dropdown' are of our own creation
* -----------END CITATION--------------
*/ 

app.get('/routes', function(req, res) {

    //Define Sql queries
    let get_routes = `SELECT idRoute, routeName, DATE_FORMAT(dateSet, '%Y-%m-%d') AS dateSet, routeGrade, active, Locations.locationName AS locationName, Routes.idRouteSetter AS idRouteSetter, RouteSetters.firstName AS firstName, RouteSetters.lastName AS lastName, RouteTypes.routeType AS routeType FROM Routes JOIN Locations ON Routes.idLocation = Locations.idLocation JOIN RouteTypes ON Routes.idRouteType = RouteTypes.idRouteType LEFT JOIN RouteSetters ON Routes.idRouteSetter = RouteSetters.idRouteSetter ORDER BY Routes.idRoute;`; 
    let location_dropdown = "SELECT idLocation, locationName from Locations;";
    let routesetter_dropdown = "SELECT idRouteSetter, firstName, lastName FROM RouteSetters;";
    let routetype_dropdown = "SELECT idRouteType, routeType FROM RouteTypes;"

    //Gets Routes for display when page is rendered
    db.pool.query(get_routes, function(error, rows, fields) {

        let routes = rows

        for (let i = 0, len = routes.length; i < len; i++) {
            if (routes[i].firstName == null) {
                routes[i].firstName = 'NULL'
                routes[i].lastName = 'NULL'
                routes[i].idRouteSetter = 'NULL'
            };
        };

        //Get location data for dropdown
        db.pool.query(location_dropdown, function(error, rows, fields){

            let locations = rows

            //Get routesetter data for dropdown
            db.pool.query(routesetter_dropdown, function(error, rows, fields){

                let routesetters = rows;

                //Get routetype data for dropdown and send all info to render
                db.pool.query(routetype_dropdown, function(error, rows, fields){

                    let routetypes = rows;

                    res.render('routes', {data:routes, locations:locations, routesetters:routesetters, routetypes:routetypes});

                })
            })
        })
    })  
})


/* -----------ROUTES POST/ADD_ROUTE ROUTE CITATION------------------
* The below route handler for the Routes page was adpated from Step 5 of the Node.js Start App provided in this course
* Date: 2/22/2024
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 5
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* 
* Description of function: Handles Post requests and responses for the routes.hbs page to add a new route to the database- Inserts a new route into the database and rerenders routes page to show update
* NOTE: The SQL query 'add_route' is of our own creation
*
* -------Hyphen Removal Citation---------
* The below code that removes hypens from the dates was copied from the answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
* Date: 2/22/2024
* Syntax Copied from answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
* Source URL: https://stackoverflow.com/questions/6204867/fastest-way-to-remove-hyphens-from-a-string
* Authors: James Hill
* -----------END CITATION--------------
*/ 

app.post('/add-route', function(req, res) {

    //Pull out and format data from request 
    let data = req.body;
    //see hyphen removal citation
    let dateSet = (data.dateSet).replace(/-/g,'');
    let active = parseInt(data.active);
    let idLocation = parseInt(data.locationName);
    let idRouteSetter = data.idRouteSetter;
    if (idRouteSetter != 'null') {
        idRouteSetter = parseInt(idRouteSetter)
    };
    let idRouteType = parseInt(data.idRouteType);

    // Database Insert Queries
    let add_route = `INSERT INTO Routes(routeName, dateSet, routeGrade, active, idLocation, idRouteSetter, idRouteType) VALUES('${data.routeName}', ${dateSet}, '${data.routeGrade}', ${active}, ${idLocation}, ${idRouteSetter}, ${idRouteType});`;

    //Add new route and handle errors
    db.pool.query(add_route, function(error, rows, fields){
        if (error) {
   
            console.log(error);
            res.sendStatus(400);
                   
        //If no error, reload classes page
        } else {

            res.redirect('routes');

        };
    });
});


/* -----------ROUTES POST/ADD_ROUTE ROUTE CITATION------------------
* The below route handler for the Routes page was adpated from Step 8 of the Node.js Start App provided in this course
* Date: 2/22/2024
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 8
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* 
* Description of function: Handles Put requests and responses for the routes.hbs page to update a route to the database - Make an update to a route in the database and sends the updated info back to be rendered
* NOTE: The SQL query 'update_route' and 'get_route_update' is of our own creation
*
* -Hyphen Removal Citation
* The below code that removes hypens from the dates was copied from the answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
* Date: 2/22/2024
* Syntax Copied from answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
* Source URL: https://stackoverflow.com/questions/6204867/fastest-way-to-remove-hyphens-from-a-string
* Authors: James Hill
* -----------END CITATION--------------
*/ 


app.put('/update-route', function(req, res) {

    //format data to be sent to sql database for insertion
    let data = req.body
    let idRoute = parseInt(data.idRoute)
    let dateSet = parseInt((data.dateSet).replace(/-/g,''));
    let active = parseInt(data.active)
    let idLocation = parseInt(data.idLocation)
    let idRouteSetter = data.idRouteSetter
    if (idRouteSetter != 'null') {
        idRouteSetter = parseInt(idRouteSetter)
    };
    let idRouteType = parseInt(data.idRouteType)

    //define sql queries
    let update_route = `UPDATE Routes SET routeName = '${data.routeName}', dateSet = ${dateSet}, routeGrade = '${data.routeGrade}', active = ${active}, idLocation = ${idLocation}, idRouteSetter = ${idRouteSetter}, idRouteType = ${idRouteType} WHERE idRoute = ${idRoute};`;
    let get_route_update =`SELECT idRoute, routeName, DATE_FORMAT(dateSet, '%Y-%m-%d') AS dateSet, routeGrade, active, Locations.locationName AS locationName, Routes.idRouteSetter AS idRouteSetter, RouteSetters.firstName AS firstName, RouteSetters.lastName AS lastName, RouteTypes.routeType AS routeType FROM Routes JOIN Locations ON Routes.idLocation = Locations.idLocation JOIN RouteTypes ON Routes.idRouteType = RouteTypes.idRouteType LEFT JOIN RouteSetters ON Routes.idRouteSetter = RouteSetters.idRouteSetter WHERE idRoute = ${idRoute};`
        
    //update the route info
    db.pool.query(update_route, function(error, rows, fields) {
        if(error) {

            console.log(error);
            res.sendStatus(400);

        } else {
            //get the updated data back and send to render
            db.pool.query(get_route_update, function(error, rows, fields){
                if(error) {

                    console.log(error);
                    res.sendStatus(400);

                } else {
                    if (rows[0].firstName == null) {
                        rows[0].firstName = 'NULL'
                        rows[0].lastName = 'NULL'
                        rows[0].idRouteSetter = 'NULL'
                    };
                    
                    res.send(rows)
                };
            });
        };
    });
});



/* -----------ROUTE TYPES ------------------ */


/* -----------ROUTE TYPES GET/POST/ADD_ROUTE/DELETE ROUTE CITATION------------------
* The below route handlers for the Route Types page were adpated from Steps 4, 5, and 7 of the Node.js Start App provided in this course
* Date: 2/22/2024
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Steps 4, 5, and 7
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* 
* Description of function: Handles GET/POST/Delete requests and responses for the routetypes.hbs page to add a new route to the database- 
* Inserts a new route type into the database and rerenders routes page to show update
* Deletes route from both table and SQL database.
* -----------END CITATION--------------
*/ 

app.get('/routetypes', function(req, res) {  

    // Define our query
    let getTypes = "SELECT * FROM RouteTypes ORDER BY idRouteType;";     

    // Execute the query
    db.pool.query(getTypes, function(error, rows, fields) {    

        res.render('routetypes', {data: rows});  

    })                                                      
});    

app.post('/add-routetype-ajax', function(req, res) {

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
 
    // Create the query and run it on the database
    routeInsert = `INSERT INTO RouteTypes (routeType) VALUES ('${data.routeType}')`;
    db.pool.query(routeInsert, function(error, rows, fields){
   
        // Check to see if there was an error
        if (error) {
   
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);

        } else {

            // If there was no error, perform second query
            routeShow = `SELECT * FROM RouteTypes ORDER BY idRouteType;`;
            db.pool.query(routeShow, function(error, rows, fields){
   
                // If there was an error on the second query, send a 400
                if (error) {
                       
                    console.log(error);
                    res.sendStatus(400);

                    // If no error, send back results of second query
                    } else {   

                       res.send(rows);

                    }
                })
            }
        })
   });


app.delete('/delete-routetype-ajax/', function(req,res,next) {

    //capture incoming data and parse
    let data = req.body;
    let routeTypeID = parseInt(data.idRouteType);
    let deleteRouteType = `DELETE FROM RouteTypes WHERE RouteTypes.idRouteType = ?`;
   
    // Run the 1st query
    db.pool.query(deleteRouteType, [routeTypeID], function(error, rows, fields){
        if (error) {
   
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);

        } else {
            //send successful status
            res.sendStatus(204);

        }
    })
});
   


/* -----------ROUTE SETTERS ------------------ */


/* -----------ROUTE SETTERS GET ROUTE CITATION------------------
* The below route handler for the Routes page was adapted from Step 4 of the Node.js Start App provided in this course
* Date: 2/21/2024
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 4
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* -----------END CITATION--------------
*/ 

app.get('/routesetters', function(req, res) {  

    // Define our query
    let getSetters = "SELECT * FROM RouteSetters;";   

    // Execute the query
    db.pool.query(getSetters, function(error, rows, fields){    

        res.render('routesetters', {data: rows});  

    })                                                      
});    
   
/* -----------ROUTE SETTERS ADD_ROUTE ROUTE CITATION------------------
* The below route handler for the RouteSetters page was adapted from Step 5 of the Node.js Start App provided in this course
* Date: 2/22/2024
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 5
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* 
* Description of function: Handles Post requests and responses for the routesetters.hbs page to add a routesetter to the database 
* -----------END CITATION--------------
*/ 

app.post('/add-routesetter-ajax', function(req, res) {

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    addRouteSetter = `INSERT INTO RouteSetters (firstName, lastName, certLevel) VALUES ('${data.firstName}', '${data.lastName}', ${data.certLevel})`;
    db.pool.query(addRouteSetter, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);

        } else {

            // If there was no error, perform a SELECT * on RouteSetters
            showRouteSetters = `SELECT * FROM RouteSetters ORDER BY idRouteSetter;`;
            db.pool.query(showRouteSetters, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);

                // If no error, send results back
                } else {

                    res.send(rows);
                }
            })
        }
    })
});
   


/* -----------LISTENER CITATION------------------
* The below code is copied from from the Node.js Starter App referenced and linked to in this course. 
* Date: Originally accessed 1/15/2024
* Copied from: GitHub: osu-cs340-ecampus/nodejs-starter-app
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* -----------END CITATION--------------
*/ 

/*
LISTENER
   -Listens for requests coming in for the PORT number that is assigned in the SETUP section above
*/
app.listen(PORT, function(){

   console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')

});
