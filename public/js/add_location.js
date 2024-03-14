/* -----------ADD LOCATION CITATION------------------
* The below function is adapted from the Node.js Web App provided in the Exploration - Web Application Technology 
* Date: 2/14/2024 and 2/23/2024
* Adapted from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 5 and bsg_HTML_UI file provided in the Exploration - Web Application Technology
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app and https://canvas.oregonstate.edu/courses/1946034/pages/exploration-web-application-technology?module_item_id=23809327
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
* 
* Description of function: Dynamically adds new data via form to Locations table
* -----------END CITATION--------------
*/

// Get the objects we need to modify
let addLocationForm = document.getElementById('add-location-form-ajax');


// Modify the objects we need
addLocationForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let locationNameInput = document.getElementById("input-locationName");
    let streetAddressInput = document.getElementById("input-streetAddress");
    let cityInput = document.getElementById("input-city");
    let stateInput = document.getElementById("input-state");
    let zipcodeInput = document.getElementById("input-zipcode");

    // Get the values from the form fields
    let locationNameValue = locationNameInput.value;
    let streetAddressValue = streetAddressInput.value;
    let cityValue = cityInput.value;
    let stateValue = stateInput.value;
    let zipcodeValue = zipcodeInput.value;

    // Put our data we want to send in a javascript object
    let data = {
        locationName: locationNameValue,
        streetAddress: streetAddressValue,
        city: cityValue,
        state: stateValue,
        zipcode: zipcodeValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-location-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            locationNameInput.value = '';
            streetAddressInput.value = '';
            cityInput.value = '';
            stateInput.value = '';
            zipcodeInput.value = '';

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

// Creates a single row from an Object representing a single record from Locations
addRowToTable = (data) => {

    // Use reference to the current Locations table so it can be appended to directly
    var $currentTable = $('#locations-table');

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 7 cells (including Delete)
    let row = document.createElement("TR");
    let idLocationCell = document.createElement("TD");
    let locationNameCell = document.createElement("TD");
    let streetAddressCell = document.createElement("TD");
    let cityCell = document.createElement("TD");
    let stateCell = document.createElement("TD");
    let zipcodeCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");
    // We create a separate button element so that it can be styled to match the 
    // existing buttons in the table and nested within deleteCell
    let deleteButton = document.createElement("button");

    // Fill the cells with correct data
    idLocationCell.innerText = newRow.idLocation;
    locationNameCell.innerText = newRow.locationName;
    streetAddressCell.innerText = newRow.streetAddress;
    cityCell.innerText = newRow.city;
    stateCell.innerText = newRow.state;
    zipcodeCell.innerText = newRow.zipcode;

    // Match the styling of the existing buttons in the table
    deleteButton.setAttribute("class", "btn btn-secondary btn-sm");
    
    // Event listener is attached to the new button itself instead of the 
    // entire deleteCell
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function(){
        deleteLocation(newRow.idLocation);
    };

    // Nest the delete button in the deleteCell like it is in the existing table
    deleteCell.appendChild(deleteButton);

    // Add the cells to the row 
    row.appendChild(idLocationCell);
    row.appendChild(locationNameCell);
    row.appendChild(streetAddressCell);
    row.appendChild(cityCell);
    row.appendChild(stateCell);
    row.appendChild(zipcodeCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.idLocation);
    
    // Add the row directly to the table
    $currentTable.append(row);

    document.getElementById("hiddenAdd").style.display = "none"

    // Start of new Step 8 code for adding new data to the dropdown menu for updating people
    
    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("locationSelect");
    let option = document.createElement("option");
    option.text = newRow.locationName;
    option.value = newRow.idLocation;
    selectMenu.add(option);
    // End of new step 8 code.

    
}