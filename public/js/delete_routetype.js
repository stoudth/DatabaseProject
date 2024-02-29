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