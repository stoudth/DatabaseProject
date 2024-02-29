-- Group 74
-- Sarah Van Hoose and Hailey Stoudt
-- Rock Gym
-- Data Manipulation Queries 
-- Note: We have illustrated all CRUD operations for each table but will choose which 
-- operations to implement when connecting the site based on the Project guidelines.
-- : character being used to denote the variables that will have data from the backend programming language



/*Members*/

-- Get all members for the browse Members page
SELECT idMember, firstName, lastName, dateOfBirth, email, waiverSigned 
FROM Members
ORDER BY idMember

-- Get a single members information for Members update page (: character denotes variable)
SELECT idMember, firstName, lastName, dateOfBirth, email, waiverSigned 
FROM Members
WHERE idMember = :member_id_selected_to_edit

-- Update a single member's information from Members update page (: character denotes variable)
UPDATE Members 
SET firstName = :firstNameInput, lastName = :lastNameInput, dateOfBirth = :dobInput, email = :emailInput, waiverSigned = waiverInput
WHERE idMember = :id_from_update

-- Insert new member in Members (: character denotes variable)
INSERT INTO Members(
    firstName,
    lastName,
    dateOfBirth,
    email,
    waiverSigned
)
VALUES(
    :firstNameInput,
    :lastNameInput,
    :dobInput,
    :emailInput,
    :waiverInput
);

-- Delete a Member from the Members table (: character denotes variable)
DELETE FROM Members 
WHERE idMember = :member_id_selected




/*Locations*/

-- Get all locations for the browse Locations page
SELECT idLocation, locationName, streetAddress, city, state, zipcode 
FROM Locations
ORDER BY idLocation

-- Get a single location's information for Locations update page (: character denotes variable)
SELECT idLocation, locationName, streetAddress, city, state, zipcode
FROM Locations
WHERE idLocation = :location_id_selected_to_edit

-- Update a single locations's information from Locations update page (: character denotes variable)
UPDATE Locations
SET locationName = :locationNameInput, streetAddress = :addressInput, city = :cityInput, state = :stateInput, zipcode = zipInput
WHERE idLocation = :id_from_update

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

-- Delete a location from the Locations table (: character denotes variable)
DELETE FROM Locations
WHERE idLocation = :location_id_selected






/*Classes*/

-- Get all classes for the browse Classes page
SELECT idClass, className, sizeLimit
FROM Classes
ORDER BY idClass

-- Get a single class's information for Classes update page (: character denotes variable)
SELECT idClass, className, sizeLimit
FROM Classes
WHERE idClass = :class_id_selected_to_edit

-- Update a single class's information from Classes update page (: character denotes variable)
UPDATE Classes
SET className= :classNameInput, sizeLimit = :sizeInput
WHERE idClass = :id_from_update

-- Insert new class in the Classes (: character denotes variable)
INSERT INTO Classes(
    className,
    sizeLimit
)
VALUES(
    :classNameInput,
    :sizeInput
);

-- Delete a class from the Classes table (: character denotes variable)
DELETE FROM Classes
WHERE idClass = :class_id_selected




/*Sessions*/

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

-- Add Null attendance when Session is Created for Counting (: character denotes variable)
INSERT INTO Attendance (
    idSession
)
VALUES(
    (
        SELECT idSession FROM Sessions 
        WHERE idLocation = (SELECT idLocation FROM Locations WHERE locationName = :locationNameSelected)
        AND idClass = (SELECT idClass FROM Classes WHERE className = :classNameSelected)
        AND classDate = :dateInput
    )
);

-- Delete a Member from the Members table (: character denotes variable)
DELETE FROM Sessions
WHERE idSession = :session_id_selected



/*Attendance*/

-- Get all attendance for the browse Attendance page
SELECT idAttendance, Members.firstName AS firstName, Members.lastName AS lastName, Attendance.idSession, Locations.locationName, Classes.className, Sessions.classDate
FROM Attendance
    INNER JOIN Members
        ON Attendance.idMember = Members.idMember
    LEFT JOIN Sessions
        ON Attendance.idSession = Sessions.idSession
    JOIN Locations 
        ON Sessions.idLocation = Locations.idLocation
    JOIN Classes
        ON Sessions.idClass = Classes.idClass
ORDER BY idAttendance

-- Get all attendance for specific class (: character denotes variable)
SELECT idAttendance, Members.firstName AS firstName, Members.lastName AS lastName
FROM Attendance
    INNER JOIN Members
        ON Attendance.idMember = Members.idMember
    LEFT JOIN Sessions
        ON Attendance.idSession = Sessions.idSession
    JOIN Locations 
        ON Sessions.idLocation = Locations.idLocation
    JOIN Classes
        ON Sessions.idClass = Classes.idClass
WHERE Sessions.idLocation = (SELECT idLocation FROM Locations WHERE locationName = :inputLocationName)
    AND Sessions.idClass = (SELECT idClass FROM Classes WHERE className = :inputClassName)
    AND Sessions.classDate = :inputDate
ORDER BY idAttendance

-- Generate Members drop down for use within Sessions (Create Or Update Operations)
SELECT idMember, firstName, lastName FROM Members

-- Generate Sessions drop down for use with Sessions (Create Or Update Operations)
SELECT Sessions.idSession, Locations.locationName AS locationName, Classes.className, classDate
FROM Sessions
    INNER JOIN Locations
        ON Sessions.idLocation = Locations.idLocation
    LEFT JOIN Classes
        ON Sessions.idClass = Classes.idClass

-- Get all attendance for a specific Member (: character denotes variable)
SELECT idAttendance, Attendance.idSession, Locations.locationName, Classes.className, Sessions.classDate
FROM Attendance
    INNER JOIN Members
        ON Attendance.idMember = Members.idMember
    LEFT JOIN Sessions
        ON Attendance.idSession = Sessions.idSession
    JOIN Locations 
        ON Sessions.idLocation = Locations.idLocation
    JOIN Classes
        ON Sessions.idClass = Classes.idClass
WHERE Members.firstName = :firstNameSelected AND Members.lastName = :lastNameSelected


-- Update a single attendance's information from Attendance update page (: character denotes variable)
UPDATE Attendance
SET idSession = :session_ID_Selected, 
    idMember = (SELECT idMember FROM Members WHERE firstName = :SelectedFirstName AND lastName = :SelectedLastName)
WHERE idAttendance = :id_from_update

-- Insert new attendance record into Attendance (: character denotes variable)
INSERT INTO Attendance(
    idSession,
    idMember
)
VALUES(
    :selected_session_id,
    :selected_member_id,
);

-- Delete a Member from the Members table (: character denotes variable)
DELETE FROM Attendance
WHERE idAttendance = :attendance_id_selected



/*Routes*/

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

-- Delete a Route from the Routes table (: character denotes variable)
DELETE FROM Routes
WHERE idRoute = :route_id_selected



/*RouteSetters*/

-- Get all routesetters for the browse RouteSetters page
SELECT idRouteSetter, firstName, lastName, certLevel
FROM RouteSetters
ORDER BY idRouteSetter

-- Get a single routesetters information for RouteSetters update page (: character denotes variable)
SELECT idRouteSetter, firstName, lastName, certLevel
FROM RouteSetters
WHERE idRouteSetter = :routesetter_id_selected_to_edit

-- Update a single routesetter's information from RouteSetters update page (: character denotes variable)
UPDATE RouteSetters 
SET firstName = :firstNameInput, lastName = :lastNameInput, certLevel = :certLevelInput
WHERE idRouteSetter = :id_from_update

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

-- Delete a routesetter from the RouteSetters table (: character denotes variable)
DELETE FROM RouteSetters
WHERE idRouteSetter = :routesetter_id_selected


/*RouteTypes*/

-- Get all route types for the browse RouteTypes page
SELECT idRouteType, routeType
FROM RouteTypes
ORDER BY idRouteType

-- Get a single route type's information for RouteTypes update page (: character denotes variable)
SELECT idRouteType, routeType
FROM RouteTypes
WHERE idRouteType = :route_type_id_selected_to_edit

-- Update a single route types's information from RouteTypes update page (: character denotes variable)
UPDATE RouteTypes
SET routeType = :routeTypeInput
WHERE idRouteType = :id_from_update

-- Insert new route type in Route Types (: character denotes variable)
INSERT INTO RouteTypes(
    routeType
)
VALUES(
    :routeTypeInput
);

-- Delete a route type from the RouteTypes table (: character denotes variable)
DELETE FROM RouteTypes
WHERE idRouteType = :routetype_id_selected