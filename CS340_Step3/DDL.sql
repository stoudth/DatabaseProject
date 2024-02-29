-- Group 74
-- Sarah Van Hoose and Hailey Stoudt
-- Rock Gym
-- Data Definition Language

-- Disables Foreign Key Checks and autocommits as recommended in Project Step 2 Draft: Normalized Schema + DDL with Sample Data (Group, on Ed Discussions) instructions
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;


/*CREATES TABLES*/

-- Creates Classes table: Includes attributes for class ID, class name, and class size limit
CREATE OR REPLACE TABLE Classes (
    idClass int UNIQUE NOT NULL AUTO_INCREMENT,
    className varchar(245) NOT NULL,
    sizeLimit int NOT NULL,
    PRIMARY KEY (idClass)
);

-- Creates RouteTypes table: Includes attributes for the RouteType ID, and RouteType
CREATE OR REPLACE TABLE RouteTypes (
    idRouteType int UNIQUE NOT NULL AUTO_INCREMENT,
    routeType varchar(145) NOT NULL,
    PRIMARY KEY (idRouteType)
);

-- Creates Locations table: Includes attributes for location ID, location name, street address, city, state, and zipcode
CREATE OR REPLACE TABLE Locations(
    idLocation int UNIQUE NOT NULL AUTO_INCREMENT,
    locationName varchar(145) NOT NULL,
    streetAddress varchar(245) NOT NULL,
    city varchar(145) NOT NULL,
    state char(2) NOT NULL,
    zipcode char(5) NOT NULL,
    PRIMARY KEY (idLocation)
);

-- Creates RouteSetters table: Includes attributes for routesetter ID, first name, last name, and certfication level
CREATE OR REPLACE TABLE RouteSetters (
    idRouteSetter int UNIQUE NOT NULL AUTO_INCREMENT,
    firstName varchar(145) NOT NULL,
    lastName varchar(145) NOT NULL,
    certLevel int NOT NULL,
    PRIMARY KEY (idRouteSetter)
);

-- Creates Routes table: Includes attributes for route ID, route name, date route was set, grade of route, type of route, route location, and routesetter
CREATE OR REPLACE TABLE Routes (
    idRoute int UNIQUE NOT NULL AUTO_INCREMENT,
    routeName varchar(145) NOT NULL, 
    dateSet date NOT NULL,
    routeGrade varchar(10) NOT NULL,
    active tinyint NOT NULL DEFAULT 1,
    idLocation int NOT NULL,
    idRouteSetter int,
    idRouteType int NOT NULL,
    PRIMARY KEY (idRoute),
    FOREIGN KEY (idLocation) REFERENCES Locations(idLocation) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (idRouteSetter) REFERENCES RouteSetters(idRouteSetter) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (idRouteType) REFERENCES RouteTypes(idRouteType) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Creates Sessions intersection table: Includes attributes for the Session ID, class ID, Location ID, and date of the class
CREATE OR REPLACE TABLE Sessions (
    idSession int UNIQUE NOT NULL AUTO_INCREMENT,
    idClass int NOT NULL,
    idLocation int NOT NULL, 
    classDate date NOT NULL, 
    PRIMARY KEY (idSession),
    FOREIGN KEY (idClass) REFERENCES Classes(idClass) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (idLocation) REFERENCES Locations(idLocation) ON DELETE CASCADE ON UPDATE CASCADE
);


/*INSERT STATEMENTS*/


-- Inserts sample data into the Classes table
INSERT INTO Classes (
    className,
    sizeLimit
)
VALUES 
(
    'Mobility',
    25
),
(
    'Recovery yoga',
    20
),
(
    'Intro to Lead Climbing',
    14
),
(
    'Wilderness First Aid',
    30
),
(
    'Core Power',
    25
);

-- Inserts sample data into the Locations table
INSERT INTO Locations (
    locationName,
    streetAddress,
    city,
    state,
    zipcode
)
VALUES 
(
    'Northeast',
    '198 S Main St.',
    'Hoboken',
    'NJ',
    '07030'
),
(
    'Southeast',
    '4902 Honeysuck Ave.',
    'Atlanta',
    'GA',
    '30067'
),
(
    'Midwest',
    '472 Lakefront Ln.',
    'Cleveland',
    'OH',
    '44199'
);

-- Inserts sample data into the RouteTypes table
INSERT INTO RouteTypes (
    routeType
)
VALUES 
(
    'Slab'
),
(
    'Overhang'
),
(
    'Vertical'
);

-- Inserts sample data into the RouteSetters table
INSERT INTO RouteSetters (
    firstName,
    lastName,
    certLevel
)
VALUES 
(
    'Polly',
    'Pocket',
    2
),
(
    'Ariel',
    'Arete',
    3
),
(
    'Selene',
    'Sloper',
    1
),
(
    'Charlie',
    'Chalk',
    2
),
(
    'Dylan',
    'Dyno',
    3
);

-- Inserts sample data into the Routes table
INSERT INTO Routes (
    routeName,
    dateSet,
    routeGrade,
    active,
    idRouteType,
    idLocation,
    idRoutesetter
)
VALUES 
(
    'The Little Engine That Could',
    20240204,
    '5.6',
    1,
    1,
    3,
    1
),
(
    'Sticky Fingers',
    20240128,
    '5.10a',
    1,
    2,
    2,
    2
),
(
    'Threading the Needle',
    20240114,
    '5.11d',
    1,
    2,
    1,
    4
),
(
    'Leap of Faith',
    20240121,
    '5.9',
    1,
    3,
    3,
    5
),
(
    'Skinned Knees',
    20240121,
    '5.10b',
    1,
    1,
    2,
    Null
);

-- Inserts sample data into the Sessions table
INSERT INTO Sessions (
    idClass,
    idLocation,
    classDate
)
VALUES 
(
    1,
    3,
    20240205
),
(
    2,
    2,
    20240207
),
(
    5,
    1,
    20240209
),
(
    1,
    1,
    20240206
),
(
    4,
    3,
    20240210
);

-- Enables Foreign Key Checks and autocommits after code is done running as recommended in Project Step 2 Draft: Normalized Schema + DDL with Sample Data (Group, on Ed Discussions) instructions
SET FOREIGN_KEY_CHECKS=1;
COMMIT;