/* -----------DELETE ROUTE TYPE CITATION------------------
* The below function is adapted from the Node.js Starter App provided in the Exploration - Web Application Technology 
* Date: 2/22/2024 and 2/23/2024
* Copied from: GitHub: osu-cs340-ecampus/nodejs-starter-app - Step 7 and bsg_HTML_UI file provided in the Exploration - Web Application Technology
* Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app and https://canvas.oregonstate.edu/courses/1946034/pages/exploration-web-application-technology?module_item_id=23809327
* Authors: George Kochera, Cortona1, Dr. Michael Curry, dmgs11
*
* Description of function: Dynamically deletes a specified row from the table
* -----------END CITATION--------------
*/

function deleteRouteType(routeTypeID) {
    let link = '/delete-routetype-ajax/';
    let data = {
      idRouteType: routeTypeID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(routeTypeID);
      }
    });
  }
  
function deleteRow(routeTypeID){
    let table = document.getElementById("routetypes-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == routeTypeID) {
            table.deleteRow(i);
            break;
        }
    }
}
