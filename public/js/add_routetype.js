/* -----------ADD ROUTE TYPE CITATION------------------
* The below function is adapted from the Node.js Web App provided in the Exploration - Web Application Technology 
* Date: 2/23/2024
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 5 and bsg_HTML_UI file provided in the Exploration - Web Application Technology
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app and https://canvas.oregonstate.edu/courses/1946034/pages/exploration-web-application-technology?module_item_id=23809327
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
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


/* -----------BOOTSTRAP METHOD CITATION------------------
* The below function is modified from the original function in the Node.js Web App and uses some aspects of the script portion of Bootstrap v5's
* Append Example page source code
* Date: 3/4/2024
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 5 and bsg_HTML_UI file provided in the Exploration - Web Application Technology &
* Bootstrap v5 Examples > Methods > Append 
* Source URLs: https://github.com/osu-cs340-ecampus/nodejs-starter-app and https://canvas.oregonstate.edu/courses/1946034/pages/exploration-web-application-technology?module_item_id=23809327
* https://examples.bootstrap-table.com/#methods/append.html#view-source
*
* Description of function: Dynamically adds form data to table with appropriate styling
* -----------END CITATION--------------
*/

// Creates a single row from an Object representing a single record from routeType
addRowToTable = (data) => {

    // Use reference to the current RouteTypes table so it can be appended to directly
    var $currentTable = $('#routetypes-table');


    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 3 cells
    let row = document.createElement("TR");
    let idRouteTypeCell = document.createElement("TD");
    let routeTypeCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // We create a separate button element so that it can be styled to match the 
    // existing buttons in the table and nested within deleteCell
    let deleteButton = document.createElement("button");

    // Fill the cells with correct data
    idRouteTypeCell.innerText = newRow.idRouteType;
    routeTypeCell.innerText = newRow.routeType;

    // Match the styling of the existing buttons in the table
    deleteButton.setAttribute("class", "btn btn-secondary btn-sm");
    
    // Event listener is attached to the new button itself instead of the 
    // entire deleteCell
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function(){
        deleteRouteType(newRow.idRouteType);
    };

    // Nest the delete button in the deleteCell like it is in the existing table
    deleteCell.appendChild(deleteButton);

    // Add the cells to the row 
    row.appendChild(idRouteTypeCell);
    row.appendChild(routeTypeCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.idRouteType);
    
    // Add the row directly to the table
    $currentTable.append(row);

    document.getElementById("hiddenAdd").style.display = "none"
}