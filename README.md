# DatabaseProject

Course: CS 340
Authors: Sarah Van Hoose and Hailey Stoudt

Apex Climbing Gym 

Apex Climbing is a commercial climbing gym with 3 Locations. They have 5 RouteSetters (employees who plan and set the climbing routes for the gym) and host a variety of Classes. Classes can range from yoga to learning to lead climb to calisthenics. They are looking for a database in order to keep track of the Classes they are offering and which Locations they are at. Apex aims to use this data to ensure they are scheduling Classes effectively at each Location. Apex provides a range of different types of climbing Routes for all skill levels in a variety of different Route Types, and they would also like to keep track of which Routes are currently up at each Location and which RouteSetter has set them. Occasionally, they have guest RouteSetters who come in to set their Routes. They typically have around 100 different Routes per Location at any given time. The information tracked in the database will be used to help plan the new Routes set for the upcoming week. 

Their database-driven website will record the class sessions in an intersection table, Sessions, of offered Classes at specific Locations. Finally, the database will keep track of the Routes at Locations set by RouteSetters and their different RouteTypes.


Details: This site is built using Node.js and Handlebars. Styling is implemented using BootStraps. 

Citations:

--------SETUP and LISTENER---------
The setup and Listener code in app.js is copied from the Node.js Starter App referenced and linked to in this course. Specifically taken from Steps 1 and Steps 3. 
Date: Express setup and Database Connection originally accessed 1/15/2024 (Step1) - Handlebar Setup accessed starting 2/21/2024 (Step 3)
Copied from: GitHub: osu-cs340-ecampus/nodejs-starter-app (Step 1 and Step 3)
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
Description: Setup: Code tells Node.js that we are using express and creating an express instance. The PORT is assigned and db-connector.js is imported. Imports Handlebars, creates a handlebar instance, and tells express to use handlebars. Listener: Listens for requests coming in for the PORT number that is assigned in the SETUP section above.
-----------------------------------


--------CRUD OPERATION ROUTEHANDLERS---------
The routehandlers in the app.js are adapted from the the Node.js Starter App referenced and linked to in this course. Specifically taken from Steps 4 through 8. 
First Date Viewed: 2/21/2024
Coptied from: GitHub: osu-cs340-ecampus/nodejs-starter-app (Step 4-8)
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
Description: These routehandlers handle the Create, Read, Update, and Delete requests that are made from the site. They parse any data necessary and send the requests to the SQL database. It then handles any return information that needs to be sent back. Note: SQL queries are of our own creation.
----------------------------------------------


-------HYPHEN REMOVAL--------------
Hyphen removal code is used within app.js and the public js files. This code was copied from the answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
Date: 2/22/2024
Copied from answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow
Source URL: https://stackoverflow.com/questions/6204867/fastest-way-to-remove-hyphens-from-a-string 
Authors: James Hill
Description: This code removes hyphens from dates in order to appropriately send date information to the SQL database. 
-----------------------------------

---------HTML CITATION------------
The HTML code in the hbs files in the views folder was adapted from the html code file bsg_HTML_UI provided in the Exploration - Web Application Technology.
Date: 2/14/2024
Code adapted from: bsg_HTML_UI provided in the Exploration - Web Application Technology
Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/exploration-web-application-technology?module_item_id=23809327
Author: Dr. Michael Curry
Description: The HTML code in the hbs files implements the structure of the UI for each given page. All pages consist of a navigation bar, a header, a table that displays data for each database table, and a section to insert new data for a given table. Some pages also contain delete and update sections in order to perform those operations. 
------------------------------


--------HANDLEBAR CITATION---------
The handlebar use in the hbs files to generate data tables and dropdown menus is taken from the Node.js Starter App provided in this course.
Date: 2/21/2023
Copied from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Steps 3, 4 and 6
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
Description: Imports and uses handlebar syntax to display data that is sent back from the routehandler that was retrieved from the SQL database. 
--------------------------------