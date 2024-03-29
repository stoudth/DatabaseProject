/* -----------UPDATE SESSION CITATION------------------
* The below function is adapted from the javascript in the html code file bsg_HTML_UI provided in the Exploration - Web Application Technology 
* and the node.js starter app provided in this course
* Date: 2/14/2024 and 2/23/2023
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 7 (see the for loop that checks the display table) and bsg_HTML_UI file provided in the Exploration - Web Application Technology
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app and https://canvas.oregonstate.edu/courses/1946034/pages/exploration-web-application-technology?module_item_id=23809327
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* Description: Pulls corresponding data from table row associated with the sessionID that is passed to the function and manipulates the DOM tree to pre-fill the Update Form. 
*
* ------------- Dropdown menu length Citation--------------
* The syntax for getting the number of fields in a dropdown was taken from the answer from Chase on the 'JavaScript - get length of list options' page on StackOverflow
* Date: 2/23/2023
* Syntax copied from answer provided by chase on the 'JavaScript - get length of list options' page on StackOverflow
* Source URL: https://stackoverflow.com/questions/13166229/javascript-get-length-of-list-options
*
* Description of function: Shows the update session page and displays the current session information in the update form fields
* -----------END CITATION--------------
*/ 

function updateSession(sessionID) {

    //display update section
    document.getElementById('insert').style.display = 'none';
    document.getElementById('update').style.display = 'block';

    //Pulls corresponding fields to be fill in with info of current session's info
    let session_id_update = document.getElementById("updatesessionID");
    session_id_update.innerHTML = sessionID;

    let location_select = document.getElementById("updateLocationName");
    let loc_select_length = location_select.options.length; //see Dropdown menu length Citation


    let name_select = document.getElementById("updateClassName")
    let name_select_length = name_select.options.length;  //see Dropdown menu length Citation

    let date_select = document.getElementById("updateClassDate");
    

    //Sets update form field info with info pulled from table
    let table = document.getElementById("session-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == sessionID) {
            for (let j = 0; j < loc_select_length; j++) {
                if (location_select.options[j].innerHTML == table.rows[i].cells[1].innerHTML) { 
                    location_select.selectedIndex = j
                };
            };
            for (let k = 0; k < name_select_length; k ++) {
                if (name_select.options[k].innerHTML == table.rows[i].cells[2].innerHTML) {
                    name_select.selectedIndex = k
                };
            }
            date_select.value = table.rows[i].cells[3].innerHTML
        };
    };
};


/* -----------SENDUPDATE CITATION------------------
* The below function is adapted from the node.js starter app provided in this course
* Date: 2/23/2023
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 7 and Step 8 (adapated jquery delete code for an update request)
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* Description of function: Sends a jquery request with the updated data to the put routehandler for sessions. It then calls a function to update that row in the dom tree.
* -----------END CITATION--------------
*/ 

function sendUpdate() {
    //pulls updated information from form
    let session_id = document.getElementById("updatesessionID").innerHTML;
    let location_id = document.getElementById("updateLocationName").value;
    let class_id = document.getElementById("updateClassName").value;
    let classDate = document.getElementById("updateClassDate").value;
        
    //formats info for request body
    let data = {
        id: session_id,
        location: location_id,
        class: class_id,
        date: classDate
    };

    //sends put request to routehandler and then calls function to update dom tree
    $.ajax({
        url: '/update-session',
        type: 'PUT',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            updateRow(session_id, result)
        }
    })
};


/* -----------UPDATEROW CITATION------------------
* The below function is adapted from the javascript in the html code file bsg_HTML_UI provided in the Exploration - Web Application Technology 
* and the node.js starter app provided in this course
* Date: 2/14/2024 and 2/23/2023
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 8 and bsg_HTML_UI file provided in the Exploration - Web Application Technology
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app and https://canvas.oregonstate.edu/courses/1946034/pages/exploration-web-application-technology?module_item_id=23809327
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* Description of function: Finds the row in the display table and updates the information in that row with the information returned from the route handler
* -----------END CITATION--------------
*/ 

function updateRow(id, res) {

    //Display browse section
    document.getElementById('browse').style.display = 'block';
    document.getElementById('insert').style.display = 'none'; 
    document.getElementById('update').style.display = 'none';

    //Slice the date to display in YYYY-MM-DD form
    strDate = String(res[0].classDate).slice(0, 10);
    let table = document.getElementById("session-table");

    //Update row in display table with new session info
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == id) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            updateRowIndex.getElementsByTagName("td")[1].innerHTML = String(res[0].locationName);
            updateRowIndex.getElementsByTagName("td")[2].innerHTML = String(res[0].className);
            updateRowIndex.getElementsByTagName("td")[3].innerHTML = String(res[0].classDate).slice(0, 10);
            updateRowIndex.getElementsByTagName("td")[4].innerHTML = String(res[0].sizeLimit)
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
    document.getElementById('update').style.display = 'none';
};


function newSession() {
    //document.getElementById('browse').style.display = 'none';
    if (document.getElementById('insert').style.display === "none") {
        document.getElementById('insert').style.display = 'block';
        document.getElementById('update').style.display = 'none';
    } else {
        document.getElementById('insert').style.display = 'none';
    }
};