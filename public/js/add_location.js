// Get the objects we need to modify
let addLocationForm = document.getElementById('add-location-form-ajax');


// Modify the objects we need
addLocationForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    //let idLocationInput = document.getElementById("input-idLocation");
    let locationNameInput = document.getElementById("input-locationName");
    let streetAddressInput = document.getElementById("input-streetAddress");
    let cityInput = document.getElementById("input-city");
    let stateInput = document.getElementById("input-state");
    let zipcodeInput = document.getElementById("input-zipcode");

    // Get the values from the form fields
    //let idLocationValue = idLocationInput.value;
    let locationNameValue = locationNameInput.value;
    let streetAddressValue = streetAddressInput.value;
    let cityValue = cityInput.value;
    let stateValue = stateInput.value;
    let zipcodeValue = zipcodeInput.value;

    // Put our data we want to send in a javascript object
    let data = {
        //idLocation: idLocationValue,
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
            //idLocationInput.value = '';
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


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("locations-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idLocationCell = document.createElement("TD");
    let locationNameCell = document.createElement("TD");
    let streetAddressCell = document.createElement("TD");
    let cityCell = document.createElement("TD");
    let stateCell = document.createElement("TD");
    let zipcodeCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idLocationCell.innerText = newRow.idLocation;
    locationNameCell.innerText = newRow.locationName;
    streetAddressCell.innerText = newRow.streetAddress;
    cityCell.innerText = newRow.city;
    stateCell.innerText = newRow.state;
    zipcodeCell.innerText = newRow.zipcode;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteLocation(newRow.idLocation);
    };

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
    
    // Add the row to the table
    currentTable.appendChild(row);

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