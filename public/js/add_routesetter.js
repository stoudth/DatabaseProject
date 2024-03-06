/* -----------ADD ROUTE SETTERS CITATION------------------
* The below function is adapted from the Node.js Web App provided in the Exploration - Web Application Technology 
* Date: 3/03/2024
* Copied from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 5 and bsg_HTML_UI file provided in the Exploration - Web Application Technology
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app and https://canvas.oregonstate.edu/courses/1946034/pages/exploration-web-application-technology?module_item_id=23809327
* 
* Description of function: Dynamically adds new data via form entry to RouteTypes table
* -----------END CITATION--------------
*/ 

// Get the objects we need to modify
let addRouteSetterForm = document.getElementById('add-routesetter-form-ajax');

// Modify the objects we need
addRouteSetterForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let firstNameInput = document.getElementById("input-firstName");
    let lastNameInput = document.getElementById("input-lastName");
    let certLevelInput = document.getElementById("input-certLevel");

    // Get the values from the form fields
    let firstNameValue = firstNameInput.value;
    let lastNameValue = lastNameInput.value;
    let certLevelValue = certLevelInput.value;

    // Put our data we want to send in a javascript object
    let data = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        certLevel: certLevelValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-routesetter-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            firstNameInput.value = '';
            lastNameInput.value = '';
            certLevelInput.value = '';

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

// Creates a single row from an Object representing a single record from 
// routeType
addRowToTable = (data) => {

    // Use reference to the current RouteSetters table so it can be appended to directly
    let $currentTable = $('#routesetters-table');

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idRouteSetterCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let certLevelCell = document.createElement("TD");

    // Fill the cells with correct data
    idRouteSetterCell.innerText = newRow.idRouteSetter;
    firstNameCell.innerText = newRow.firstName;
    lastNameCell.innerText = newRow.lastName;
    certLevelCell.innerText = newRow.certLevel;

    // Add the cells to the row 
    row.appendChild(idRouteSetterCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(certLevelCell);
    
    // Add the row directly to the table
    $currentTable.append(row);

}