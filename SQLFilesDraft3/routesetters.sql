-- Get all routesetters for the browse RouteSetters page
SELECT idRouteSetter, firstName, lastName, certLevel
FROM RouteSetters
ORDER BY idRouteSetter

-- Get a single routesetters information for RouteSetters update page
SELECT idRouteSetter, firstName, lastName, certLevel
FROM RouteSetters
WHERE idRouteSetter = :routesetter_id_selected_to_edit

-- Update a single routesetter's information from RouteSetters update page
UPDATE RouteSetters 
SET firstName = :firstNameInput, lastName = :lastNameInput, certLevel = :certLevelInput
WHERE idRouteSetter = :id_from_update

-- Insert new routesetter in RouteSetters
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

-- Delete a routesetter from the RouteSetters table
DELETE FROM RouteSetters
WHERE idRouteSetter = :routesetter_id_selected