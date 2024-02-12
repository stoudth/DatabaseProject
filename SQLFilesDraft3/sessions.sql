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

-- Update a single session's information from Sessions update page
UPDATE Sessions
SET idLocation = (SELECT idLocation FROM Locations WHERE locationName = :locationNameSelected), 
    idClass = (SELECT idClass FROM Classes WHERE className = :classNameSelected).
    classDate = :dateInput
WHERE idSession = :id_from_update

-- Insert new session in Sessions
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

-- Add Null attendance when Session is Created for Counting
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

-- Delete a Member from the Members table
DELETE FROM Sessions
WHERE idSession = :session_id_selected