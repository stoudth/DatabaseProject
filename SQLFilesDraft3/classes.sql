-- Get all classes for the browse Classes page
SELECT idClass, className, sizeLimit
FROM Classes

-- Get a single class's information for Classes update page
SELECT idClass, className, sizeLimit
FROM Classes
WHERE idClass = :class_id_selected_to_edit

-- Update a single class's information from Classes update page
UPDATE Classes
SET className= :classNameInput, sizeLimit = :sizeInput
WHERE idClass = :id_from_update

-- Insert new class in the Classes
INSERT INTO Classes(
    className,
    sizeLimit
)
VALUES(
    :classNameInput,
    :sizeInput
);

-- Delete a class from the Classes table
DELETE FROM Classes
WHERE idClass = :class_id_selected