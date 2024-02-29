// Get the objects we need to modify
let updateLocationForm = document.getElementById('update-location-form-ajax');

// Modify the objects we need
updateLocationForm.addEventListener("submit", function (e) {
   
    // TODO make update visible without reloading! Commenting out for now
    e.preventDefault();

    // Get form fields we need to get data from
    let locationNameInput = document.getElementById("locationSelect");
    let streetAddressInput = document.getElementById("input-streetAddress-update");

    // Get the values from the form fields
    let locationNameValue = locationNameInput.value;
    let streetAddressValue = streetAddressInput.value;
    
    // Put our data we want to send in a javascript object
    let data = {
        locationName: locationNameValue,
        streetAddress: streetAddressValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-location-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            // MAYBE KEEP streetAddress
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
            let td = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign streetAddress to our value we updated to
            td.innerHTML = parsedData[0].streetAddress; 
       }
    }
}