/* -----------GENERAL CITATION------------------
* Much of the below code is either copied from or adapted from the Node.js Starter App referenced and linked to in this course. Further citations will be given for specific sections.
* Date: SET-UP and Listener originally accessed 1/15/2024 - Updated SET-UP and ROUTES accessed starting 2/21/2024
* Copied and adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* -----------END CITATION--------------
*/ 





/* -----------SETUP CITATION------------------
* Most of the below code is copied from the Node.js Starter App referenced and linked to in this course. Specifically taken from Steps 1 and Steps 3. 
* Date: Express setup and Database Connection originally accessed 1/15/2024 (Step1) - Handlebar Setup accessed starting 2/21/2024 (Step 3)
* Copied from: GitHub: osu-cs340-ecampus/nodejs-starter-app (Step 1 and Step 3)
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*
*
* In order to easily format dates, handlebars helpers has been installed and imported into this file. It is then used within the hbs files to format the handlebar dates to YYYY-MM-DD format. 
* Date: 2/23/2024
* Copied from the answer given by Simeon Babatunde (on Feb 4, 2017) and Edited by Tunaki (on Feb 4, 2017) in the 'Handlebars date format issue' post on Stack Overflow.
* Source URL: https://stackoverflow.com/questions/32260117/handlebars-date-format-issue
* Authors: Simeon Babatunde and Tunaki
* -----------END CITATION--------------
*/ 

/*
    SETUP
        -Tells Node.js that we are using express and creating an express instance. The PORT is assigned and 
         db-connector.js is imported. Imports Handlebars, creates a handlebar instance, and tells express to use handlebars.
         Handlebars Helper is also imported in order to format dates into a YYYY-MM-DD format. 
*/
// Express - Node.js Starter App Step 1
var express = require('express');
var app     = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 30058;                 

// Database - Node.js Starter App Step 1
var db = require('./database/db-connector')

// Handlebars - Node.js Starter App Step 3
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
const { restart } = require('forever');
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters

//Import Handlebars Helper for output date formatting - 'Handlebars date format issue' post on Stack Overflow: Answer from Simeon Babatunde and Tunaki
//var helpers = require('handlebars-helpers')();   



/**
 *   ROUTES - Handles routing for the incoming requests and responses and handles requests to the SQL database
 */


/*---------------------INDEX--------------------------*/


/* -----------INDEX ROUTE CITATION------------------
* The below route handler for the Index page was copied from Step 3 of the Node.js Start App provided in this course
* Date: 2/21/2024
* Copied from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 3
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* 
* Description of function: Handles route requests and responses for the index.hbs page - Renders the index page
* -----------END CITATION--------------
*/ 


app.get('/index', function(req, res)
    {
            res.render('index');                    
    });   



/*---------------------LOCATIONS--------------------------*/


/* -----------LOCATIONS GET ROUTE CITATION------------------
* The below route handler for the Locations page was copied and adpated from Step 4 of the Node.js Start App provided in this course
* Date: 2/21/2024
* Copied and Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 4
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* 
* Description of function: Handles Get requests and responses for the locations.hbs page - Renders the Locations page with Location data from the SQL Database
* NOTE: The SQL query 'get_locations' is of our own creation
* -----------END CITATION--------------
*/            
    
    app.get('/locations', function(req, res)
    {  
        let query1 = "SELECT idLocation, locationName, streetAddress, city, state, zipcode FROM Locations;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('locations', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });     

    app.post('/add-location-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
            // Create the query and run it on the database
            query1 = `INSERT INTO Locations (locationName, streetAddress, city, state, zipcode) VALUES ('${data.locationName}', '${data.streetAddress}', '${data.city}', '${data.state}', ${data.zipcode})`;
            db.pool.query(query1, function(error, rows, fields){
        
                // Check to see if there was an error
                if (error) {
        
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error)
                    res.sendStatus(400);
                }
                else
                {
                    // If there was no error, perform a SELECT * on bsg_people
                    query2 = `SELECT * FROM Locations;`;
                    db.pool.query(query2, function(error, rows, fields){
        
                        // If there was an error on the second query, send a 400
                        if (error) {
                            
                            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                            console.log(error);
                            res.sendStatus(400);
                        }
                        // If all went well, send the results of the query back.
                        else
                        {
                            res.send(rows);
                        }
                    })
                }
            })
    });
    
app.delete('/delete-location-ajax/', function(req,res,next){
    let data = req.body;
    let locationID = parseInt(data.idLocation)
    let deleteLocation = `DELETE FROM Locations WHERE idLocation = ?`; /* We'll let Cascade delete 
        take care of the Sessions and Routes tables */
              // Run the 1st query
        db.pool.query(deleteLocation, [locationID], function(error, rows, fields){
            if (error) {
      
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
      
            else {       
                res.sendStatus(204);  
            }     
        })
    });
    
app.put('/put-location-ajax', function(req,res,next){
    let data = req.body;
        
    let location = parseInt(data.locationName);
    let address = data.streetAddress;
        
    let queryUpdateAddress = `UPDATE Locations SET Locations.streetAddress = ? WHERE Locations.idLocation = ?`;
    let selectAddress = `SELECT Locations.streetAddress FROM Locations WHERE Locations.idLocation = ?`;
        
    // Run the 1st query
    db.pool.query(queryUpdateAddress, [address, location], function(error, rows, fields){
        if (error) {
        
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
    
        } else {
            // Run the second query
            db.pool.query(selectAddress, [location], function(error, rows, fields) {
            
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.send(rows);
                        }
                    })
                }
    })});

/* -----------LOCATIONS POST/ADD_LOCATION ROUTE CITATION------------------
* The below route handler for the Locations page was copied and adpated from Step 5 of the Node.js Start App provided in this course
* Date: 2/22/2024
* Copied and Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 5
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* 
* Description of function: Handles Post requests and responses for the locations.hbs page to add a new location to the database- Inserts a new class into the database and rerenders classes page to show update.
* -----------END CITATION--------------
*/ 

/*
app.post('/add-location', function(req, res) 
    {

        let data = req.body;

        //SQL query to add new location
        let add_location = `INSERT INTO Locations(locationName, streetAddress, city, state, zipcode) Values ('${data.locationName}', '${data.streetAddress}', '${data.city}', '${data.state}', '${data.zipcode}');`;

        //Handles if state abbreviation or zipcode are incorrect length
        if (data.state.length !== 2 || data.zipcode.length !== 5) {
            console.log('The input length for state or zipcode is incorrect. States should use the 2 letter abbreviation and zipcode should have 5 digits.');
            res.sendStatus(400);

        //Sends insert query to insert new location into database
        } else {
            db.pool.query(add_location, function(error, rows, fields){
                if (error) {
        
                    console.log(error)
                    res.sendStatus(400);
    
                } else {
    
                    res.redirect('locations');
                }
            })

        }

    }
)
*/

/*---------------------CLASSES--------------------------*/

/* -----------CLASSES GET ROUTE CITATION------------------
* The below route handler for the Classes page was copied and adpated from Step 4 of the Node.js Start App provided in this course
* Date: 2/21/2024
* Copied and Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 4
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* 
* Description of function: Handles Get requests and responses for the classes.hbs page -  Renders the Classes page with Classes data from the SQL Database
*                     It also queries information from the database to create dropdown selections for Locations in some forms on the page
* NOTE: The SQL query 'get_classes' and 'location_dropdown are of our own creation
* -----------END CITATION--------------
*/ 


app.get('/classes', function(req, res)
    {
        let get_classes = "SELECT idClass, className, sizeLimit FROM Classes;";
        let location_dropdown = "SELECT idLocation, locationName from Locations;";

        db.pool.query(get_classes, function(error, rows, fields) {
            
            let classes = rows;

            db.pool.query(location_dropdown, (error, rows, fields) =>{

                let locations = rows;

                return res.render('classes', {data: classes, locations: locations}); 
            });             
        });
    });     



/* -----------CLASSES POST/ADD_CLASS ROUTE CITATION------------------
* The below route handler for the Classes page was copied and adpated from Step 5 of the Node.js Start App provided in this course
* Date: 2/22/2024
* Copied and Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 5
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* 
* Description of function: Handles Post requests and responses for the classes.hbs page to add a new class to the database- Inserts a new class into the database and rerenders classes page to show update
*                     It also inserts the first session of said class into the Session table in the databse
* NOTE: The SQL query 'add_class' and 'add_session' are of our own creation
*
* -Hyphen Removal Citation
* The below code that removes hypens from the dates was copied from the answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
* Date: 2/22/2024
* Copied from answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
* Source URL: https://stackoverflow.com/questions/6204867/fastest-way-to-remove-hyphens-from-a-string
* Authors: James Hill
* -----------END CITATION--------------
*/ 

app.post('/add_class', function(req, res)
    {
        //Pull out and format data from request 
        let data = req.body;

        let className = data.className;
    
        let sizeLimit = parseInt(data.sizeLimit);

        let location = parseInt(data.locationName)

        let classDate = (data.classDate)
        classDate = classDate.replace(/-/g,'') //See hyphen removal citation
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
* The below route handler for the Classes page was copied and adpated from Step 7 of the Node.js Start App provided in this course
* Date: 2/23/2024
* Copied and Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 7
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* 
* Description of function: Handles Delete requests and responses for the classes.hbs page - Sends a 204 response if deletion from database was successful
* NOTE: The SQL query 'delete_class' is of our own creation
* -----------END CITATION--------------
*/ 

app.delete('/delete-class-ajax/', function(req, res, next)
    {
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
            
                res.sendStatus(204);
            };
        });
    });




/*---------------------SESSIONS--------------------------*/


/* -----------SESSIONS GET ROUTE CITATION------------------
* The below route handler for the Sessions page was copied and adpated from Step 4 of the Node.js Start App provided in this course
* Date: 2/21/2024
* Copied and Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 4
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* 
* Description of function: Handles Get requests and responses for the sessions.hbs page - Renders the Sessions page with Sessions data from the SQL Database
*                     It also queries information from the database to create dropdown selections for Locations and Classes in some forms on the page
* NOTE: The SQL query 'get_sessions', 'class_drowdown', and 'location_dropdown' are of our own creation
* -----------END CITATION--------------
*/ 

app.get('/sessions', function(req, res)
    {
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
* The below route handler for the Sessions page was copied and adpated from Step 8 of the Node.js Start App provided in this course
* Date: 2/23/2024
* Copied and Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 8
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* 
* Description of function: Handles Put requests and responses for the session.hbs page updates a sessions info in the database - Updates the Sesions info and then gets the new sessions data to return to be rendered on the page
* NOTE: The SQL query 'add_class' and 'add_session' are of our own creation
*
* -Hyphen Removal Citation
* The below code that removes hypens from the dates was copied from the answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
* Date: 2/22/2024
* Copied from answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
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
    let classDate = hyphenDate.replace(/-/g,'') //See hyphen removal citation
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
* The below route handler for the Sessions page was copied and adpated from Step 5 of the Node.js Start App provided in this course
* Date: 2/22/2024
* Copied and Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 5
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* 
* Description of function: Handles Post requests and responses for the sessions.hbs page to add a new session to the database- Inserts a new session into the database and sends back added data
* NOTE: The SQL query 'add_session' is of our own creation
*
* -Hyphen Removal Citation
* The below code that removes hypens from the dates was copied from the answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
* Date: 2/22/2024
* Copied from answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
* Source URL: https://stackoverflow.com/questions/6204867/fastest-way-to-remove-hyphens-from-a-string
* Authors: James Hill
* -----------END CITATION--------------
*/ 

app.post('/add-session', function(req, res)
    {
        //Pull out and format data from request 
        let data = req.body;

        let idLocation = parseInt(data.idLocation)
        let idClass = parseInt(data.idClass)
        let classDate = parseInt((data.classDate).replace(/-/g,''));

        // Database Insert Queries
        let add_session = `INSERT INTO Sessions(idLocation, idClass, classDate) VALUES (${idLocation}, ${idClass}, ${classDate});`
        let get_new_session = `SELECT Sessions.idSession AS idSession, Locations.locationName AS locationName, Classes.className AS className, DATE_FORMAT(classDate, '%Y-%m-%d') AS classDate, Classes.sizeLimit As sizeLimit FROM Sessions INNER JOIN Locations ON Sessions.idLocation = Locations.idLocation LEFT JOIN Classes ON Sessions.idClass = Classes.idClass WHERE Sessions.idLocation = ${idLocation} AND Sessions.idClass = ${idClass} AND Sessions.classDate = ${classDate}`

        //Add new session and handle errors
        db.pool.query(add_session, function(error, rows, fields){
            if (error) {
    
                console.log(error);
                res.sendStatus(400);
                    
                    //If no error, reload classes page
                } else {
                    
                    db.pool.query(get_new_session, function(error, rows, feilds){
                        if (error) {

                            console.log(error);
                            res.sendStatus(400)

                        } else {
                            console.log(rows)
                            res.send(rows)
                        }
                        
                    })
                };
            });
        });

/*---------------------ROUTES--------------------------*/

/* -----------ROUTES GET ROUTE CITATION------------------
* The below route handler for the Routes page was copied and adpated from Step 4 of the Node.js Start App provided in this course
* Date: 2/21/2024
* Copied and Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 4
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* 
* Description of function: Handles Get requests and responses for the routes.hbs page - Renders the Routes page with Routes data from the SQL Database
*                     It also queries information from the database to create dropdown selections for Locations, RouteSetters, and RouteTypes in some forms on the page
* NOTE: The SQL query 'get_routes', 'routesetter_drowdown', 'routetype_dropdown, and 'location_dropdown' are of our own creation
* -----------END CITATION--------------
*/ 


app.get('/routes', function(req, res) {

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

        db.pool.query(location_dropdown, function(error, rows, fields){

            let locations = rows

            db.pool.query(routesetter_dropdown, function(error, rows, fields){

                let routesetters = rows;

                db.pool.query(routetype_dropdown, function(error, rows, fields){

                    let routetypes = rows;

                    res.render('routes', {data:routes, locations:locations, routesetters:routesetters, routetypes:routetypes});

                })
            })
        })
    })  
})


/* -----------ROUTES POST/ADD_ROUTE ROUTE CITATION------------------
* The below route handler for the Routes page was copied and adpated from Step 5 of the Node.js Start App provided in this course
* Date: 2/22/2024
* Copied and Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 5
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* 
* Description of function: Handles Post requests and responses for the routes.hbs page to add a new route to the database- Inserts a new route into the database and rerenders routes page to show update
* NOTE: The SQL query 'add_route' is of our own creation
*
* -Hyphen Removal Citation
* The below code that removes hypens from the dates was copied from the answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
* Date: 2/22/2024
* Copied from answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
* Source URL: https://stackoverflow.com/questions/6204867/fastest-way-to-remove-hyphens-from-a-string
* Authors: James Hill
* -----------END CITATION--------------
*/ 

app.post('/add-route', function(req, res)
    {
        //Pull out and format data from request 
        let data = req.body;
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
* The below route handler for the Routes page was copied and adpated from Step 8 of the Node.js Start App provided in this course
* Date: 2/22/2024
* Copied and Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 8
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* 
* Description of function: Handles Put requests and responses for the routes.hbs page to update a route to the database - Make an update to a route in the database and sends the updated info back to be rendered
* NOTE: The SQL query 'update_route' and 'get_route_update' is of our own creation
*
* -Hyphen Removal Citation
* The below code that removes hypens from the dates was copied from the answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
* Date: 2/22/2024
* Copied from answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
* Source URL: https://stackoverflow.com/questions/6204867/fastest-way-to-remove-hyphens-from-a-string
* Authors: James Hill
* -----------END CITATION--------------
*/ 


app.put('/update-route', function(req, res) {
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

    let update_route = `UPDATE Routes SET routeName = '${data.routeName}', dateSet = ${dateSet}, routeGrade = '${data.routeGrade}', active = ${active}, idLocation = ${idLocation}, idRouteSetter = ${idRouteSetter}, idRouteType = ${idRouteType} WHERE idRoute = ${idRoute};`;
    let get_route_update =`SELECT idRoute, routeName, DATE_FORMAT(dateSet, '%Y-%m-%d') AS dateSet, routeGrade, active, Locations.locationName AS locationName, Routes.idRouteSetter AS idRouteSetter, RouteSetters.firstName AS firstName, RouteSetters.lastName AS lastName, RouteTypes.routeType AS routeType FROM Routes JOIN Locations ON Routes.idLocation = Locations.idLocation JOIN RouteTypes ON Routes.idRouteType = RouteTypes.idRouteType LEFT JOIN RouteSetters ON Routes.idRouteSetter = RouteSetters.idRouteSetter WHERE idRoute = ${idRoute};`

    db.pool.query(update_route, function(error, rows, fields) {
        if(error) {

            console.log(error);
            res.sendStatus(400);

        } else {
            
            db.pool.query(get_route_update, function(error,rows, fields){
                if(error) {

                    console.log(error);
                    res.sendStatus(400);

                } else {

                    res.send(rows)

                };
            });
        };
    });
});



/*
   ROUTE TYPES ROUTES
*/

app.get('/routetypes', function(req, res)
    {  
        let getTypes = "SELECT * FROM RouteTypes;";               // Define our query

        db.pool.query(getTypes, function(error, rows, fields){    // Execute the query

            res.render('routetypes', {data: rows});                  
        })                                                      
    });    

app.post('/add-routetype-ajax', function(req, res) 
    {
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
            }
            else
            {
                // If there was no error, perform a SELECT * on bsg_people
                routeShow = `SELECT * FROM RouteTypes;`;
                db.pool.query(routeShow, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {   
                        res.send(rows);
                    }
                })
            }
        })
    });

app.delete('/delete-routetype-ajax/', function(req,res,next){
    let data = req.body;
    let routeTypeID = parseInt(data.idRouteType);
    let deleteRouteType = `DELETE FROM RouteTypes WHERE RouteTypes.idRouteType = ?`;
    
            // Run the 1st query
            db.pool.query(deleteRouteType, [routeTypeID], function(error, rows, fields){
                if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }
    
                else
                {
                    res.sendStatus(204);
                }
            })
    });
    
/*
   ROUTE SETTERS ROUTES
*/

app.get('/routesetters', function(req, res)
    {  
        let getSetters = "SELECT * FROM RouteSetters;";               // Define our query

        db.pool.query(getSetters, function(error, rows, fields){    // Execute the query

            res.render('routesetters', {data: rows});                  
        })                                                      
    });     
    

 

/* -----------LISTENER CITATION------------------
* The below code is copied from from the Node.js Starter App referenced and linked to in this course. 
* Date: Originally accessed 1/15/2024
* Copied and adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
* -----------END CITATION--------------
*/ 

/*
LISTENER
    -Listens for requests coming in for the PORT number that is assigned in the SETUP section above
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});