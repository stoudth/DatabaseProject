-- Group 74
-- Sarah Van Hoose and Hailey Stoudt
-- Rock Gym
-- Data Manipulation Queries 
-- : character being used to denote the variables that will have data from the backend programming language


/*Locations*/
-- CRUD OPERATIONS: SELECT, INSERT

-- Get all locations for the browse Locations page
SELECT idLocation, locationName, streetAddress, city, state, zipcode FROM Locations

-- Insert new location in Locations (: character denotes variable)
INSERT INTO Locations(
    locationName,
    streetAddress,
    city,
    state,
    zipcode
)
Values(
    :location_name_input,
    :address_input,
    :city_input,
    :state_input,
    :zip_input
);

-- Delete location in Locations (: character denotes variable)
DELETE FROM Locations WHERE idLocation = :location_id_selected

-- Update location streetAddress in Locations (:character denotes variable)
UPDATE Locations 
SET Locations.streetAddress = :new_street_address
WHERE Locations.idLocation = :location_id_selected


/*Classes*/
-- CRUD OPERATIONS: SELECT, INSERT, DELETE (M:N DELETE)

-- Get all classes for the browse Classes page
SELECT idClass, className, sizeLimit
FROM Classes;

-- Generate drop down menu for Locations to associate with Classes to make first Session(Create Operations)
SELECT idLocation, locationName from Locations;

-- Insert new class in the Classes (: character denotes variable)
INSERT INTO Classes(
    className,
    sizeLimit
)
VALUES(
    :class_name_input,
    :size_input
);

-- INSERT New Session in Sessions intersection table when new class is made - form in html asks for location and date of first session (: character denotes variable)
INSERT INTO Sessions(
    idClass,
    idLocation,
    classDate
)
VALUES(
        (SELECT idClass FROM Classes WHERE className = :class_name_input),
        (SELECT idLocation FROM Locations WHERE locationName = :location_name_input),
        :class_date_input
    );

-- Delete a class from the Classes table (: character denotes variable)
DELETE FROM Classes
WHERE idClass = :class_id_selected;


/*Sessions*/
-- CRUD OPERATIONS: SELECT, INSERT, UPDATE (M:N Update)

-- Get all sessions for the browse Sessions page
SELECT Sessions.idSession AS idSession, Locations.locationName AS locationName, Classes.className AS className, DATE_FORMAT(classDate, '%Y-%m-%d') AS classDate, Classes.sizeLimit As sizeLimit 
FROM Sessions 
INNER JOIN Locations 
    ON Sessions.idLocation = Locations.idLocation 
LEFT JOIN Classes 
    ON Sessions.idClass = Classes.idClass 
GROUP BY Sessions.idSession;

-- Get a single sessions information for Sessions update page 
SELECT Sessions.idSession AS idSession, Locations.locationName AS locationName, Classes.className AS className, classDate, Classes.sizeLimit AS sizeLimit
FROM Sessions
INNER JOIN Locations
        ON Sessions.idLocation = Locations.idLocation
    LEFT JOIN Classes
        ON Sessions.idClass = Classes.idClass
WHERE Sessions.idSession = :session_id_selected_to_edit;

-- Generate drop down menu for Locations to associate with Sessions (Update and Create Operations)
SELECT idLocation, locationName from Locations

-- Generate dropdown menu for Classes to associate with Session (Update and Create Operations)
SELECT idClass, className from Classes;

-- Update a single session's information from Sessions update page (: character denotes variable)
UPDATE Sessions
SET idLocation = :location_id_selected,  idClass = :class_id_selected, classDate = :class_date
WHERE idSession = session_id_selected;

-- Insert new session in Sessions (: character denotes variable)
INSERT INTO Sessions(
    idLocation,
    idClass,
    classDate
)
VALUES(
    (SELECT idLocation FROM Locations WHERE locationName = :location_name_selected),
    (SELECT idClass FROM Classes WHERE className = :class_name_selected),
    :date_input
);



/*Routes*/
-- CRUD OPERATIONS: SELECT, INSERT, UPDATE(NULLABLE)

-- Get all routes for the browse Routes page 
SELECT idRoute, routeName, DATE_FORMAT(dateSet, '%Y-%m-%d') AS dateSet, routeGrade, active, Locations.locationName AS locationName, RouteSetters.firstName AS firstName, RouteSetters.lastName AS lastName, RouteTypes.routeType AS routeTypes
FROM Routes
    JOIN Locations
        ON Routes.idLocation = Locations.idLocation
    JOIN RouteTypes
        ON Routes.idRouteType = RouteTypes.idRouteType
    LEFT JOIN RouteSetters
        ON Routes.idRouteSetter = RouteSetters.idRouteSetter;

-- Generate dropdown menu for locations to associate with Routes (Create and Update Operations)
SELECT idLocation, locationName FROM Locations;

-- Generate dropdown menu for routesetters to associate with Routes (Create and Update Operations)
SELECT idRouteSetter, firstName, lastName FROM RouteSetters;

-- Generate dropdown menu for route types to associate with Routes (Create and Update Operations)
SELECT idRouteType, routeType FROM RouteTypes;

-- Get a single route for Routes update page (: character denotes variable)
SELECT idRoute, routeName, dateSet, routeGrade, active, Locations.locationName AS locationName, RouteSetters.firstName AS firstName, RouteSetters.lastName AS lastName, RouteTypes.routeType AS routeTypes
FROM Routes
    JOIN Locations
        ON Routes.idLocation = Locations.idLocation
    JOIN RouteTypes
        ON Routes.idRouteType = RouteTypes.idRouteType
    LEFT JOIN RouteSetters
        ON Routes.idRouteSetter = RouteSetters.idRouteSetter
WHERE idRoute = :route_id_selected_to_edit;

-- Update a single route's information from Routes update page (: character denotes variable)
UPDATE Routes 
SET routeName = :route_name_input, 
    dateSet = :date_input, 
    routeGrade = :grade_input, 
    active = :active_input,
    idLocation = :location_id_selected,
    idRouteSetter = :route_setter_id_selected,
    idRouteType = :route_type_id_selected
WHERE idRoute = :id_from_update;

-- Insert new route in Routes (: character denotes variable)
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
    :route_name_input,
    :date_input,
    :grade_input,
    :active_input,
    :id_location_input,
    :id_route_setter_input,
    :id_route_type_input
);


/*RouteSetters*/
--CRUD OPERATIONS: SELECT, INSERT

-- Get all routesetters for the browse RouteSetters page
SELECT * FROM RouteSetters;

-- Insert new routesetter in RouteSetters (: character denotes variable)
INSERT INTO RouteSetters(
    firstName,
    lastName,
    certLevel
)
VALUES(
    :first_name_input,
    :last_name_input,
    :cert_level_input
);


/*RouteTypes*/
-- CRUD OPERATIONS: SELECT, INSERT

-- Get all route types for the browse RouteTypes page
SELECT * FROM RouteTypes;

-- Insert new route type in Route Types (: character denotes variable)
INSERT INTO RouteTypes(
    routeType
)
VALUES(
    :routeTypeInput
);

-- Delete route types from RouteTypes page
DELETE FROM RouteTypes 
WHERE RouteTypes.idRouteType = :route_type_id_selected