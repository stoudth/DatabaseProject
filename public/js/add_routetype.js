/* -----------ADD LOCATION CITATION------------------
* The below function is adapted from the Node.js Web App provided in the Exploration - Web Application Technology 
* Date: 2/23/2024
* Copied from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 5 and bsg_HTML_UI file provided in the Exploration - Web Application Technology
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app and https://canvas.oregonstate.edu/courses/1946034/pages/exploration-web-application-technology?module_item_id=23809327
* 
* Description of function: Dynamically adds new data via form entry to RouteTypes table
* -----------END CITATION--------------
*/ 

// Get the objects we need to modify
let addRouteTypeForm = document.getElementById('add-routetype-form-ajax');

// Modify the objects we need
addRouteTypeForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let routeTypeInput = document.getElementById("input-routeType");

    // Get the values from the form fields
    let routeTypeValue = routeTypeInput.value;

    // Put our data we want to send in a javascript object
    let data = {
        routeType: routeTypeValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-routetype-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            routeTypeInput.value = '';

            alert("Form submitted successfully");
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// routeType
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("routetypes-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 2 cells
    let row = document.createElement("TR");
    let idRouteTypeCell = document.createElement("TD");
    let routeTypeCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idRouteTypeCell.innerText = newRow.idRouteType;
    routeTypeCell.innerText = newRow.routeType;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteRouteType(newRow.idRouteType);
    };

    // Add the cells to the row 
    row.appendChild(idRouteTypeCell);
    row.appendChild(routeTypeCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.idRouteType);
    
    // Add the row to the table
    currentTable.appendChild(row);
}
