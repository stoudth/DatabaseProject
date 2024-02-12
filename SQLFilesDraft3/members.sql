-- Get all members for the browse Members page
SELECT idMember, firstName, lastName, dateOfBirth, email, waiverSigned 
FROM Members

-- Get a single members information for Members update page
SELECT idMember, firstName, lastName, dateOfBirth, email, waiverSigned 
FROM Members
WHERE idMember = :member_id_selected_to_edit

-- Update a single member's information from Members update page
UPDATE Members 
SET firstName = :firstNameInput, lastName = :lastNameInput, dateOfBirth = :dobInput, email = :emailInput, waiverSigned = waiverInput
WHERE idMember = :id_from_update

-- Insert new member in Members
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

-- Delete a Member from the Members table
DELETE FROM Members 
WHERE idMember = :member_id_selected