/* -----------PERMANENTDELETECLASS CITATION------------------
* The below function is copied and adapted from the node.js starter app provided in this course
* Date: 2/23/2023
* Copied from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 7
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
*
* Description of function: Pulls selected class ID from page and sends in a delete request to the route handler. Then request ID row be removed.
* -----------END CITATION--------------
*/ 
function permanentClassDelete(idClass) {
    //Get Class ID to be deleted
    let link = '/delete-class-ajax/'
    let data = {
        id: idClass
    };

    //Sends delete request to route handler
    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            deleteRow(idClass)
        }
    })
};


/* -----------DELETEROW CITATION------------------
* The below function is adapted from the javascript in the html code file bsg_HTML_UI provided in the Exploration - Web Application Technology 
* and the node.js starter app provided in this course
* Date: 2/14/2024 and 2/23/2023
* Copied from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 7 and bsg_HTML_UI file provided in the Exploration - Web Application Technology
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app and https://canvas.oregonstate.edu/courses/1946034/pages/exploration-web-application-technology?module_item_id=23809327
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* 
* Description of function: Goes through generate table and finds id information to be deleted and delete that row from the DOM tree
* -----------END CITATION--------------
*/ 
function deleteRow(idClass){
    //get display data table
    let table = document.getElementById("class-table");

    //find row that corresponds to id
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == idClass) {

            //delete row
            table.deleteRow(i);
            document.getElementById('browse').style.display = 'block';
            document.getElementById('insert').style.display = 'none';
            document.getElementById('delete').style.display = 'none';
            break;
        };
    };
};


/* -----------BROWSE and NEWCLASS CITATION------------------
* The below functions are copied and adapted from the javascript in the html code file bsg_HTML_UI provided in the Exploration - Web Application Technology 
* Date: 2/14/2024
* Copied from: bsg_HTML_UI file provided in the Exploration - Web Application Technology
* Author: Dr. Michael Currry
* Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/exploration-web-application-technology?module_item_id=23809327
* 
* Description of function: Displays the applicable sections in the dom tree when called
* -----------END CITATION--------------
*/ 

function browse() {
    document.getElementById('browse').style.display = 'block';
    document.getElementById('insert').style.display = 'none';
    document.getElementById('delete').style.display = 'none';
};


function newClass() {
    //document.getElementById('browse').style.display = 'none';
    if (document.getElementById('insert').style.display === "none") {
        document.getElementById('insert').style.display = 'block';
        document.getElementById('update').style.display = 'none';
    } else {
        document.getElementById('insert').style.display = 'none';
    }
};