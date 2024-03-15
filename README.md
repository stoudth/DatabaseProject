# DatabaseProject

Course: CS 340
Authors: Sarah Van Hoose and Hailey Stoudt

# Apex Climbing Gym 

Apex Climbing is a commercial climbing gym with 3 Locations. They have 5 RouteSetters (employees who plan and set the climbing routes for the gym) and host a variety of Classes. Classes can range from yoga to learning to lead climb to calisthenics. They are looking for a database in order to keep track of the Classes they are offering and which Locations they are at. Apex aims to use this data to ensure they are scheduling Classes effectively at each Location. Apex provides a range of different types of climbing Routes for all skill levels in a variety of different Route Types, and they would also like to keep track of which Routes are currently up at each Location and which RouteSetter has set them. Occasionally, they have guest RouteSetters who come in to set their Routes. They typically have around 100 different Routes per Location at any given time. The information tracked in the database will be used to help plan the new Routes set for the upcoming week. 

Their database-driven website will record the class sessions in an intersection table, Sessions, of offered Classes at specific Locations. Finally, the database will keep track of the Routes at Locations set by RouteSetters and their different RouteTypes.

Details: This site is built using Node.js and Handlebars. Styling is implemented using BootStraps. 

## Citations:


#### SETUP and LISTENER
The setup and Listener code in app.js is copied from the Node.js Starter App referenced and linked to in this course. Specifically taken from Steps 1 and Steps 3. <br />
**Date:** Express setup and Database Connection originally accessed 1/15/2024 (Step1) - Handlebar Setup accessed starting 2/21/2024 (Step 3) <br />
**Copied from:** GitHub: osu-cs340-ecampus/nodejs-starter-app (Step 1 and Step 3) <br />
**Source URL:** https://github.com/osu-cs340-ecampus/nodejs-starter-app <br />
**Authors:** George Kochera, Cortona1, Dr. Michael Curry, dmgs11 <br />
**Description** Setup: Code tells Node.js that we are using express and creating an express instance. The PORT is assigned and db-connector.js is imported. Imports Handlebars, creates a handlebar instance, and tells express to use handlebars. Listener: Listens for requests coming in for the PORT number that is assigned in the SETUP section above.

---------------------------

#### CRUD OPERATION ROUTEHANDLERS
The routehandlers in the app.js are adapted from the the Node.js Starter App referenced and linked to in this course. Specifically taken from Steps 4 through 8. <br />
**First Date Viewed:** 2/21/2024 <br />
**Adapted from:** GitHub: osu-cs340-ecampus/nodejs-starter-app (Step 4-8) <br />
**Source URL:** https://github.com/osu-cs340-ecampus/nodejs-starter-app <br />
**Authors:** George Kochera, Cortona1, Dr. Michael Curry, dmgs11 <br />
**Description:** These routehandlers handle the Create, Read, Update, and Delete requests that are made from the site. They parse any data necessary and send the requests to the SQL database. It then handles any return information that needs to be sent back. Note: SQL queries are of our own creation.

---------------------------

#### HYPHEN REMOVAL
Hyphen removal code is used within app.js and the public js files. This code was copied from the answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow <br />
**Date:** 2/22/2024 <br />
**Copied from:** Answer provided by James Hill (on Jun 1, 2011/edited Nov 26, 2012) on the 'Fastest way to remove hyphens from a string' page on StackOverflow <br />
**Source URL:** https://stackoverflow.com/questions/6204867/fastest-way-to-remove-hyphens-from-a-string <br />
**Authors:** James Hill <br />
**Description:** This code removes hyphens from dates in order to appropriately send date information to the SQL database. <br />

-----------------------------------

#### HTML CITATION
The HTML code in the hbs files in the views folder and some of the JavaScript language in the js files was adapted from the html code file bsg_HTML_UI provided in the Exploration - Web Application Technology. <br />
**Date:** 2/14/2024 <br />
**Adapted from:** bsg_HTML_UI provided in the Exploration - Web Application Technology <br />
**Source URL:** https://canvas.oregonstate.edu/courses/1946034/pages/exploration-web-application-technology?module_item_id=23809327 <br />
**Author:** Dr. Michael Curry <br />
**Description:** The HTML code in the hbs files implements the structure of the UI for each given page. All pages consist of a navigation bar, a header, a table that displays data for each database table, and a section to insert new data for a given table. Some pages also contain delete and update sections in order to perform those operations. The javascript referenced was used to toggle division views. 

------------------------------

#### HANDLEBAR CITATION
The handlebar use in the hbs files to generate data tables and dropdown menus is adapted from the Node.js Starter App provided in this course. <br />
**Date:** 2/21/2023 <br />
**Adapted from:** GitHub: osu-cs340-ecampus/nodejs-starter-app - Steps 3, 4 and 6 <br />
**Source URL:** https://github.com/osu-cs340-ecampus/nodejs-starter-app <br />
**Authors:** George Kochera, Cortona1, Dr. Michael Curry, dmgs11 <br />
**Description:** Uses handlebar syntax to display data that is sent back from the routehandler that was retrieved from the SQL database. 

--------------------------------


#### JAVASCRIPT CRUD OPERATION FUNCTIONS
The JavaScript code in the public js files was adapted from the bsg_HTML_UI file provided int he Exploration - Web Application Technology and the node.js starter app provided in this course <br />
**Date:** 2/14/2024 and 2/23/2023 <br />
**Adapted from:** GitHub: osu-cs340-ecampus/nodejs-starter-app - Steps4-8 and bsg_HTML_UI file provided in the Exploration - Web Application Technology
**Source URL:** https://github.com/osu-cs340-ecampus/nodejs-starter-app and https://canvas.oregonstate.edu/courses/1946034/pages/exploration-web-application-technology?module_item_id=23809327 <br />
**Authors:** George Kochera, Cortona1, Dr. Michael Curry, dmgs11 <br />
**Description:** The functions in the public js files handle actions in the UI by listening for or handling actions made by the user. They then pull and process the necessary information to send to the routehandlers and update the DOM tree accordingly based on the returned response.

-----------------------------------------------

#### DROPDOWN MENU IN PUBLIC JS FILES CITATION
The syntax for getting the number of fields in a dropdown was taken from the answer from Chase on the 'JavaScript - get length of list options' page on StackOverflow <br />
**Date:** 2/23/2023 <br />
**Syntax copied from:** Answer provided by chase on the 'JavaScript - get length of list options' page on StackOverflow <br />
**Source URL:** https://stackoverflow.com/questions/13166229/javascript-get-length-of-list-options <br />
**Description of function:** Shows the update session page and displays the current session information in the update form fields

----------------------------------------------

#### APPENDING BUTTON IN TABLE CELL CITATION
The syntax for the 'cell_name'.append(button) code from the public js files was taken from the answer by Emiel Zuurbier on June 28, 2021 StackOverflow post Javascript - button inside a table -> inserting TextContent <br />
**Date:** 2/28/2024 <br />
**Syntax copied from:** StackOverflow post Javascript - button inside a table -> inserting TextContent <br />
**Author:** Emiel Zuurbier <br />
**Source URL:** https://stackoverflow.com/questions/68168071/javascript-button-inside-a-table-inserting-textcontent
**Description:** Appends a button into a table cell instead of making the cell the button. <br />

----------------------------------------------

#### APPENDING ELEMENTS TO A TABLE WHILE USING BOOTSTRAP
The syntax in order to update an existing diplay table that utilizes Bootstrap for styling with a new row of information was taken from the Bootstrap website <br />
**Date:** 3/4/2024 <br />
**Syntax copied from:** Bootstrap v5 website Examples > Methods > Append <br />
**Source URL:** https://examples.bootstrap-table.com/#methods/append.html <br />
**Description:** Adds a new row to a table that utilizes Bootstrap for formatting by appending elements.

-------------------------------

#### BOOTSTRAP CITATION
Styling throughout database site is sourced from Bootstrap v5.3.3 unless otherwise stated <br />
**Date:** 3/4/2024 <br />
**Source URL:** https://getbootstrap.com/docs/5.3/getting-started/introduction/ <br />
**Description:** Styles the site to be visually appealing

-----------------------------------------

#### TOGGLE ADD BUTTONS SCRIPT CITATION
The toggle buttons that are used in some of the HBS files were adapted W3 Schools How To guide.<br />
**Date:** 2/25/2023 <br />
**Adapted from:** W3 Schools How TO - Toggle Hide and Show <br />
**Source URL:** https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp <br />
**Description:** The purpose of this script in some of the hbs files is to allow users to toggle between hiding and showing add/update forms as needed.

---------------------------------------