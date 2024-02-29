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
ORDER BY idAttendance ASC

-- Get all attendance for specific class
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

-- Generate Members drop down for use within Sessions (Create Or Update Operations)
SELECT idMember, firstName, lastName FROM Members

-- Generate Sessions drop down for use with Sessions (Create Or Update Operations)
SELECT Sessions.idSession, Locations.locationName AS locationName, Classes.className, classDate
FROM Sessions
    INNER JOIN Locations
        ON Sessions.idLocation = Locations.idLocation
    LEFT JOIN Classes
        ON Sessions.idClass = Classes.idClass
ORDER BY Sessions.idSession ASC

-- Get all attendance for a specific Member
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


-- Update a single attendance's information from Attendance update page
UPDATE Attendance
SET idSession = :session_ID_Selected, 
    idMember = (SELECT idMember FROM Members WHERE firstName = :SelectedFirstName AND lastName = :SelectedLastName)
WHERE idAttendance = :id_from_update

-- Insert new attendance record into Attendance
INSERT INTO Attendance(
    idSession,
    idMember
)
VALUES(
    :selected_session_id,
    :selected_member_id,
);

-- Delete a Member from the Members table
DELETE FROM Attendance
WHERE idAttendance = :attendance_id_selected