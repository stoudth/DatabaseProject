-- Get all routes for the browse Routes page
SELECT idRoute, routeName, dateSet, routeGrade, active, Locations.locationName, RouteSetters.firstName, RouteSetters.LastName, RouteTypes.routeType
FROM Routes
    JOIN Locations
        ON Routes.idLocation = Locations.idLocation
    JOIN RouteSetters
        ON Routes.idRouteSetter = RouteSetters.idRouteSetter
    JOIN RouteTypes
        ON Routes.idRouteType = RouteTypes.idRouteType

-- Generate dropdown menu for locations to associate with Routes (Create and Update Operations)
SELECT idLocation, locationName FROM Locations

-- Generate dropdown menu for routesetters to associate with Routes (Create and Update Operations)
SELECT idRouteSetter, firstName, lastName FROM RouteSetters

-- Generate dropdown menu for route types to associate with Routes (Create and Update Operations)
SELECT idRouteType, routeType FROM RouteTypes

-- Get a single route for Routes update page
SELECT idRoute, routeName, dateSet, routeGrade, active, Locations.locationName, RouteSetters.firstName, RouteSetters.LastName, RouteTypes.routeType
FROM Routes
    JOIN Locations
        ON Routes.idLocation = Locations.idLocation
    JOIN RouteSetters
        ON Routes.idRouteSetter = RouteSetters.idRouteSetter
    JOIN RouteTypes
        ON Routes.idRouteType = RouteTypes.idRouteType
WHERE idRoute = :route_id_selected_to_edit

-- Update a single route's information from Routes update page
UPDATE Routes 
SET routeName = :routeNameInput, 
    dateSet = :dateInput, 
    routeGrade = :gradeInput, 
    active = :activeInput,
    idLocation = :locationIDSelected,
    idRouteSetter = :routeSetterIDSelected,
    idRouteType = :routeTypeIDSelected
WHERE idRoute = :id_from_update

-- Insert new route in Routes
INSERT INTO Routes(
    routeName,
    dateSet,
    routeGrade,
    active,
    idLocation,
    idRouteSetter,
    idRouteType
)
VALUES(
    :routeNameInput,
    :dateInput,
    :gradeInput,
    :activeInput,
    :idLocationInput,
    :idRouteSetterInput,
    :idRouteTypeInput
);

-- Delete a Route from the Routes table
DELETE FROM Routes
WHERE idRoute = :route_id_selected