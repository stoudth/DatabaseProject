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
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters

//Import Handlebars Helper for output date formatting - 'Handlebars date format issue' post on Stack Overflow: Answer from Simeon Babatunde and Tunaki
var helpers = require('handlebars-helpers')();   



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
        let get_locations = "SELECT idLocation, locationName, streetAddress, city, state, zipcode FROM Locations ORDER BY idLocation;";

        db.pool.query(get_locations, function(error, rows, fields) {

            res.render('locations', {data:rows});                  
        });                                                      
    });                                                     



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
        let get_classes = "SELECT idClass, className, sizeLimit FROM Classes ORDER BY idClass;";
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
        let get_sessions = "SELECT Sessions.idSession AS idSession, Locations.locationName AS locationName, Classes.className AS className, classDate, Classes.sizeLimit As sizeLimit FROM Sessions INNER JOIN Locations ON Sessions.idLocation = Locations.idLocation LEFT JOIN Classes ON Sessions.idClass = Classes.idClass GROUP BY Sessions.idSession ORDER BY Sessions.idSession;"; 
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