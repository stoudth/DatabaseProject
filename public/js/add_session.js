/* -----------ADDSESSION CITATION------------------
* The below function is adapted from the node.js starter app provided in this course
* Date: 2/28/2023
* Copied from: GitHub: osu-cs340e-ecampus/nodejs-starter-app - Step 5, Step 7, and Step 8 (adapated jquery delete code for an update request)
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 
* Description of function: Sends a jquery request with the new Session data to the post routehandler for sessions. It then calls a function to add a new row in the dom tree.
* -----------END CITATION--------------
*/ 

function addSession() {
    //get values to add new session
    let location_id = document.getElementById('addLocationName').value
    let class_id = document.getElementById("addClassName").value
    let classDate = document.getElementById('addClassDate').value

    //format to send to routehandler
    let data = {
        idLocation: location_id,
        idClass: class_id,
        classDate: classDate
    }
        
    //send add request to routehandler
    $.ajax({
        url: '/add-session',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            addRow(result)
        }
    })

};



/* -----------ADDROW CITATION------------------
* The below function is adapted from the javascript in the html code file bsg_HTML_UI provided in the Exploration - Web Application Technology 
* and the node.js starter app provided in this course
* Date: 2/14/2024 and 2/28/2023
* Copied from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 8 and bsg_HTML_UI file provided in the Exploration - Web Application Technology
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app and https://canvas.oregonstate.edu/courses/1946034/pages/exploration-web-application-technology?module_item_id=23809327
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* Description of function: Finds the row in the display table and updates the information in that row with the information returned from the route handler

*----------CELL.APPEND CITATION------------
* The syntax for the 'cell_name'.append(button) code was taken from the answer by Emiel Zuurbier on June 28, 2021 StackOverflow post Javascript - button inside a table -> inserting TextContent 
* Date: 2/28/2024
* Syntax copied from: StackOverflow post Javascript - button inside a table -> inserting TextContent 
* Author: Emiel Zuurbier 
* Source URL: https://stackoverflow.com/questions/68168071/javascript-button-inside-a-table-inserting-textcontent
* Description: Adds a button inside a given table cell
*-----------END CITATION--------------
*/ 

function addRow(res){
    //Display browse section
    document.getElementById('browse').style.display = 'block';
    document.getElementById('insert').style.display = 'none'; 
    document.getElementById('update').style.display = 'none';
        
    var $currentTable = $('#session-table');
        
    //define new table elements
    let row = document.createElement("TR");
    let id_cell = document.createElement("TD");
    let location_name = document.createElement("TD");
    let class_name = document.createElement("TD");
    let class_date = document.createElement("TD");
    let size_limit = document.createElement("TD");
    let edit = document.createElement("TD")

    //add info to cells
    id_cell.innerHTML = res[0].idSession
    location_name.innerHTML = res[0].locationName
    class_name.innerHTML = res[0].className
    class_date.innerHTML = res[0].classDate
    size_limit.innerHTML = res[0].sizeLimit

    //insert edit button
    editButton = document.createElement("button")
    editButton.setAttribute("class", "btn btn-secondary btn-sm");

    editButton.innerHTML = "Edit"
    editButton.onclick = function(){
        updateSession(res[0].sessionID)
    }

    edit.append(editButton)
         
    //add cells elements to row
    row.appendChild(id_cell)
    row.appendChild(location_name)
    row.appendChild(class_name)
    row.appendChild(class_date)
    row.appendChild(size_limit)
    row.appendChild(edit)

    row.setAttribute('data-value', res[0].sessionID);

    //add row to table
    $currentTable.appendChild(row)
        
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
    if (document.getElementById('insert').style.display === "none") {
    document.getElementById('insert').style.display = 'block';
    document.getElementById('update').style.display = 'none';
    } else {
        document.getElementById('insert').style.display = 'none';
    }
};