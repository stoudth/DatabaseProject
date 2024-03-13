/* -----------UPDATE LOCATION CITATION------------------
* The below function is adapted from the Node.js Starter App provided in this course
* Date: 2/23/2023
* Copied from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 8 
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 
* Description of function: Dynamically adds data to Locations table
* -----------END CITATION--------------
*/ 

// Get the objects we need to modify
let updateLocationForm = document.getElementById('update-location-form-ajax');

// Modify the objects we need
updateLocationForm.addEventListener("submit", function (e) {
   
    e.preventDefault();

    // Get form fields we need to get data from
    let locationNameInput = document.getElementById("locationSelect");
    let streetAddressInput = document.getElementById("input-streetAddress-update");
    let cityInput = document.getElementById("input-city-update")
    let stateInput = document.getElementById("input-state-update")
    let zipcodeInput = document.getElementById("input-zipcode-update")

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
    xhttp.open("PUT", "/put-location-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            alert("Row updated successfully");
            updateRow(xhttp.response, locationNameValue);
            updateRow(xhttp.response, streetAddressValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, locationID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("locations-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == locationID) {

            // Get the location of the row where we found the matching location ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of streetAddress value
            let td = updateRowIndex.getElementsByTagName("td");

            // Reassign streetAddress to our value we updated to
            td[2].innerHTML = parsedData[0].streetAddress; 
            td[3].innerHTML = parsedData[0].city;
            td[4].innterHTML = parsedData[0].state;
            td[5].innerHTML = parsedData[0].zipcode;
       }
    }
}