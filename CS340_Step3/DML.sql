-- Group 74
-- Sarah Van Hoose and Hailey Stoudt
-- Rock Gym
-- Data Manipulation Queries 
-- Note: We have illustrated all CRUD operations for each table but will choose which 
-- operations to implement when connecting the site based on the Project guidelines.
-- : character being used to denote the variables that will have data from the backend programming language


/*Locations*/
--CRUD OPERATIONS: SELECT, INSERT

-- Get all locations for the browse Locations page
SELECT idLocation, locationName, streetAddress, city, state, zipcode 
FROM Locations
ORDER BY idLocation

-- Insert new location in Locations (: character denotes variable)
INSERT INTO Locations(
    locationName,
    streetAddress,
    city,
    state,
    zipcode
)
Values(
    :locationNameInput,
    :addressInput,
    :cityInput,
    :stateInput,
    :zipInput
);



/*Classes*/
--CRUD OPERATIONS: SELECT, INSERT, DELETE (M:N DELETE)

-- Get all classes for the browse Classes page
SELECT idClass, className, sizeLimit
FROM Classes
ORDER BY idClass

-- Insert new class in the Classes (: character denotes variable)
INSERT INTO Classes(
    className,
    sizeLimit
)
VALUES(
    :classNameInput,
    :sizeInput
);

-- INSERT New Session in Sessions intersection table when new class is made - form in html asks for location and date of first session (: character denotes variable)
INSERT INTO Sessions(
    idClass,
    idLocation,
    classDate
)
VALUES(
    (
        (SELECT idClass FROM Classes WHERE className = :classNameInput),
        (SELECT idLocation FROM Locations WHERE locationName = :locationNameInput),
        :classDateInput
    )
);

-- Delete a class from the Classes table (: character denotes variable)
DELETE FROM Classes
WHERE idClass = :class_id_selected


/*Sessions*/
--CRUD OPERATIONS: SELECT, INSERT, UPDATE (M:N Update)

-- Get all sessions for the browse Sessions page
SELECT Sessions.idSession, Locations.locationName AS locationName, Classes.className, classDate, IFNULL(COUNT(Attendance.idMember),0)totalAttendance, Classes.sizeLimit
FROM Sessions
    INNER JOIN Locations
        ON Sessions.idLocation = Locations.idLocation
    LEFT JOIN Classes
        ON Sessions.idClass = Classes.idClass
    JOIN Attendance
        ON Attendance.idSession = Sessions.idSession
GROUP BY Attendance.idSession
ORDER BY Attendance.idSession

-- Get a single sessions information for Sessions update page 
SELECT Sessions.idSession, Locations.locationName AS locationName, Classes.className, classDate, IFNULL(COUNT(Attendance.idMember),0)totalAttendance, Classes.sizeLimit
FROM Sessions
INNER JOIN Locations
        ON Sessions.idLocation = Locations.idLocation
    LEFT JOIN Classes
        ON Sessions.idClass = Classes.idClass
    JOIN Attendance
        ON Attendance.idSession = Sessions.idSession
WHERE Attendance.idSession = :session_id_selected_to_edit

-- Generate drop down menu for Locations to associate with Sessions (Update and Create Operations)
SELECT idLocation, locationName from Locations

--Generate dropdown menu for Classes to associate with Session (Update and Create Operations)
SELECT idClass, className from Classes

-- Update a single session's information from Sessions update page (: character denotes variable)
UPDATE Sessions
SET idLocation = (SELECT idLocation FROM Locations WHERE locationName = :locationNameSelected), 
    idClass = (SELECT idClass FROM Classes WHERE className = :classNameSelected).
    classDate = :dateInput
WHERE idSession = :id_from_update

-- Insert new session in Sessions (: character denotes variable)
INSERT INTO Sessions(
    idLocation,
    idClass,
    classDate
)
VALUES(
    (SELECT idLocation FROM Locations WHERE locationName = :locationNameSelected),
    (SELECT idClass FROM Classes WHERE className = :classNameSelected),
    :dateInput
);



/*Routes*/
--CRUD OPERATIONS: SELECT, INSERT, UPDATE(NULLABLE)

-- Get all routes for the browse Routes page 
SELECT idRoute, routeName, dateSet, routeGrade, active, Locations.locationName, RouteSetters.firstName, RouteSetters.LastName, RouteTypes.routeType
FROM Routes
    JOIN Locations
        ON Routes.idLocation = Locations.idLocation
    JOIN RouteSetters
        ON Routes.idRouteSetter = RouteSetters.idRouteSetter
    JOIN RouteTypes
        ON Routes.idRouteType = RouteTypes.idRouteType
ORDER BY idRoute

-- Generate dropdown menu for locations to associate with Routes (Create and Update Operations)
SELECT idLocation, locationName FROM Locations

-- Generate dropdown menu for routesetters to associate with Routes (Create and Update Operations)
SELECT idRouteSetter, firstName, lastName FROM RouteSetters

-- Generate dropdown menu for route types to associate with Routes (Create and Update Operations)
SELECT idRouteType, routeType FROM RouteTypes

-- Get a single route for Routes update page (: character denotes variable)
SELECT idRoute, routeName, dateSet, routeGrade, active, Locations.locationName, RouteSetters.firstName, RouteSetters.LastName, RouteTypes.routeType
FROM Routes
    JOIN Locations
        ON Routes.idLocation = Locations.idLocation
    JOIN RouteSetters
        ON Routes.idRouteSetter = RouteSetters.idRouteSetter
    JOIN RouteTypes
        ON Routes.idRouteType = RouteTypes.idRouteType
WHERE idRoute = :route_id_selected_to_edit

-- Update a single route's information from Routes update page (: character denotes variable)
UPDATE Routes 
SET routeName = :routeNameInput, 
    dateSet = :dateInput, 
    routeGrade = :gradeInput, 
    active = :activeInput,
    idLocation = :locationIDSelected,
    idRouteSetter = :routeSetterIDSelected,
    idRouteType = :routeTypeIDSelected
WHERE idRoute = :id_from_update

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
    :routeNameInput,
    :dateInput,
    :gradeInput,
    :activeInput,
    :idLocationInput,
    :idRouteSetterInput,
    :idRouteTypeInput
);


/*RouteSetters*/
--CRUD OPERATIONS: SELECT, INSERT

-- Get all routesetters for the browse RouteSetters page
SELECT idRouteSetter, firstName, lastName, certLevel
FROM RouteSetters
ORDER BY idRouteSetter

-- Insert new routesetter in RouteSetters (: character denotes variable)
INSERT INTO RouteSetters(
    firstName,
    lastName,
    certLevel
)
VALUES(
    :firstNameInput,
    :lastNameInput,
    :certLevelInput
);


/*RouteTypes*/
--CRUD OPERATIONS: SELECT, INSERT

-- Get all route types for the browse RouteTypes page
SELECT idRouteType, routeType
FROM RouteTypes
ORDER BY idRouteType

-- Insert new route type in Route Types (: character denotes variable)
INSERT INTO RouteTypes(
    routeType
)
VALUES(
    :routeTypeInput
);