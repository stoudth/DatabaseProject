/* -----------BROWSE and NEWROUTE CITATION------------------
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

function newRoute() {
    document.getElementById('browse').style.display = 'none';
    document.getElementById('insert').style.display = 'block';
    document.getElementById('update').style.display = 'none';
};


/* -----------UPDATE ROUTE CITATION------------------
* The below function is adapted from the javascript in the html code file bsg_HTML_UI provided in the Exploration - Web Application Technology 
* and the node.js starter app provided in this course
* Date: 2/14/2024 and 2/23/2023
* Copied from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 7 (see the for loop that checks the display table) and bsg_HTML_UI file provided in the Exploration - Web Application Technology
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app and https://canvas.oregonstate.edu/courses/1946034/pages/exploration-web-application-technology?module_item_id=23809327
* 
* -- Dropdown menu length Citation
* The syntax for getting the number of fields in a dropdown was taken from the answer from Chase on the 'JavaScript - get length of list options' page on StackOverflow
* Date: 2/23/2023
* Syntax copied from answer provided by chase on the 'JavaScript - get length of list options' page on StackOverflow
* Source URL: https://stackoverflow.com/questions/13166229/javascript-get-length-of-list-options
*
* Description of function: Shows the update session page and displays the current session information in the update form fields
* -----------END CITATION--------------
*/ 

function updateRoute(routeID) 
    {
        //display update section
        document.getElementById('browse').style.display = 'none';
        document.getElementById('insert').style.display = 'none';
        document.getElementById('update').style.display = 'block';

        //Pulls corresponding fields to be fill in with info of current session's info
        let route_id_update = document.getElementById("updateRouteID");
        route_id_update.innerHTML = routeID;

        let route_name = document.getElementById("updateRouteName");
        let date_set = document.getElementById("updateDateSet")
        let route_grade = document.getElementById("updateRouteGrade")
        let active_select = document.getElementById("updateActive")
        let act_select_length = active_select.options.length; //see Dropdown menu length Citation
        let location_select = document.getElementById("updateLocation")
        let loc_select_length = location_select.options.length; //see Dropdown menu length Citation
        let route_setter = document.getElementById("updateRouteSetter")
        let rs_select_length = route_setter.options.length //see Dropdown menu length Citation
        let route_type = document.getElementById("updateRouteType")
        let rt_select_length = route_type.options.length //see Dropdown menu length Citation

        //Sets update form field info with info pulled from table
        let table = document.getElementById("route-table");
        for (let i = 0, row; row = table.rows[i]; i++) {
            if (table.rows[i].getAttribute("data-value") == routeID) {
                table.rows[i].cells[1].innerHTML
                route_name.value = table.rows[i].cells[1].innerHTML
                date_set.value = table.rows[i].cells[2].innerHTML
                route_grade.value = table.rows[i].cells[3].innerHTML
                for (let j = 0; j < act_select_length; j++) {
                    if (active_select.options[j].value == table.rows[i].cells[4].innerHTML) {
                        active_select.selectedIndex = j
                    }
                }
                for (let k = 0; k < loc_select_length; k++) {
                    if (location_select.options[k].innerHTML == table.rows[i].cells[5].innerHTML) {
                        location_select.selectedIndex = k
                    };
                }
                for (let m = 0; m < rs_select_length; m++) {
                    if (route_setter.options[m].value == table.rows[i].cells[6].innerHTML) {
                        route_setter.selectedIndex = m
                    };
                }
                for (let n = 0; n < rt_select_length; n++) {
                    if (route_type.options[n].innerHTML == table.rows[i].cells[9].innerHTML) {
                        route_type.selectedIndex = n
                    };
                };
            };
        };
    };

function sendUpdate() 
    {
        //pulls updated information from form
        let route_id = document.getElementById("updateRouteID").innerHTML;
        let route_name = document.getElementById("updateRouteName").value;
        let date_set = document.getElementById("updateDateSet").value;
        let route_grade = document.getElementById("updateRouteGrade").value
        let active = document.getElementById("updateActive").value;
        let location_id = document.getElementById("updateLocation").value
        let route_setter_id = document.getElementById("updateRouteSetter").value
        let route_type_id = document.getElementById("updateRouteType").value
        
        //formats info for request body
        let data = {
            idRoute: route_id,
            routeName: route_name,
            dateSet: date_set,
            routeGrade: route_grade,
            active: active,
            idLocation: location_id,
            idRouteSetter: route_setter_id,
            idRouteType: route_type_id
        };

        console.log(data)
        //sends put request to routehandler and then calls function to update dom tree
        $.ajax({
            url: '/update-route',
            type: 'PUT',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(result) {
                updateRow(route_id, result)
            }
        })
    };
    

/* -----------UPDATEROW CITATION------------------
* The below function is adapted from the javascript in the html code file bsg_HTML_UI provided in the Exploration - Web Application Technology 
* and the node.js starter app provided in this course
* Date: 2/14/2024 and 2/23/2023
* Copied from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 8 and bsg_HTML_UI file provided in the Exploration - Web Application Technology
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app and https://canvas.oregonstate.edu/courses/1946034/pages/exploration-web-application-technology?module_item_id=23809327
* Description of function: Finds the row in the display table and updates the information in that row with the information returned from the route handler
* -----------END CITATION--------------
*/ 

function updateRow(id, res)
{
    //Display browse section
    document.getElementById('browse').style.display = 'block';
    document.getElementById('insert').style.display = 'none'; 
    document.getElementById('update').style.display = 'none';


    let table = document.getElementById("route-table");



    //Update row in display table with new session info
    for (let i = 0, row; row = table.rows[i]; i++) {
    if (table.rows[i].getAttribute("data-value") == id) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            updateRowIndex.getElementsByTagName("td")[1].innerHTML = String(res[0].routeName);
            updateRowIndex.getElementsByTagName("td")[2].innerHTML = String(res[0].dateSet);
            updateRowIndex.getElementsByTagName("td")[3].innerHTML = String(res[0].routeGrade);
            updateRowIndex.getElementsByTagName("td")[4].innerHTML = String(res[0].active);
            updateRowIndex.getElementsByTagName("td")[5].innerHTML = String(res[0].locationName);
            updateRowIndex.getElementsByTagName("td")[6].innerHTML = String(res[0].idRouteSetter);
            updateRowIndex.getElementsByTagName("td")[7].innerHTML = String(res[0].firstName);
            updateRowIndex.getElementsByTagName("td")[8].innerHTML = String(res[0].lastName);
            updateRowIndex.getElementsByTagName("td")[9].innerHTML = String(res[0].routeType);
            break;
        };
    };
};