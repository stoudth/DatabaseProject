-- Get all route types for the browse RouteTypes page
SELECT idRouteType, routeType
FROM RouteTypes

-- Get a single route type's information for RouteTypes update page
SELECT idRouteType, routeType
FROM RouteTypes
WHERE idRouteType = :route_type_id_selected_to_edit

-- Update a single route types's information from RouteTypes update page
UPDATE RouteTypes
SET routeType = :routeTypeInput
WHERE idRouteType = :id_from_update

-- Insert new route type in Route Types
INSERT INTO RouteTypes(
    routeType
)
VALUES(
    :routeTypeInput
);

-- Delete a route type from the RouteTypes table
DELETE FROM RouteTypes
WHERE idRouteType = :routetype_id_selected