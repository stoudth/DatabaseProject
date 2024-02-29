-- Get all locations for the browse Locations page
SELECT idLocation, locationName, streetAddress, city, state, zipcode 
FROM Locations

-- Get a single location's information for Locations update page
SELECT idLocation, locationName, streetAddress, city, state, zipcode
FROM Locations
WHERE idLocation = :location_id_selected_to_edit

-- Update a single locations's information from Locations update page
UPDATE Locations
SET locationName = :locationNameInput, streetAddress = :addressInput, city = :cityInput, state = :stateInput, zipcode = zipInput
WHERE idLocation = :id_from_update

-- Insert new location in Locations
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

-- Delete a location from the Locations table
DELETE FROM Locations
WHERE idLocation = :location_id_selected