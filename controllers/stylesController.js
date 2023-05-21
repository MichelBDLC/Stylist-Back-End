const express = require('express');
const styles = express.Router();

const {
    getAllStyles, getStyle, createStyle, deleteStyle, updateStyle
} = require("../queries/styles");

styles.get('/', async (request, response) => {

    try {

        const allStyles = await getAllStyles(request.query);

        if (allStyles.length > 0) {

            response.status(200).json(allStyles);
        } 
        else {
            response.status(404).json({ error: "No styles found" });
        }
    } catch (error) {
        response.status(500).json({ error: "Failed to fetch styles" });
    }
});

styles.get('/:id', async (request, response) => {

    const { id } = request.params;
    const style = await getStyle(id);

    if (style) {
        response.status(200).json(style);
    }
    else {
        response.status(404).json({ error: "style not found"});
    };
});

styles.post('/', async (request, response) => {

    if (request.body) {

        try {

            const newStyle = await createStyle(request.body);
            response.status(201).json(newStyle);
        } catch (error) {

            response.status(500).json({ error: "Failed to create style" });
        }
    } else {

        response.status(400).json({ error: "Invalid request body" });
    }
});

styles.delete('/:id', async (request, response) => {

    const { id } = request.params;

    try {

        const deletedStyle = await deleteStyle(id);
        response.sendStatus(204);
    } catch (error) {
        
        response.status(500).json({ error: "Failed to delete style" });
    }
});

styles.put('/:id', async (request, response) => {

    const { id } = request.params;

    if (request.body) {
        
        const updatedStyle = await updateStyle(id, request.body);
        response.status(200).json(updatedStyle);
    }
    else {
        response.status(404).json({ error: "cannot update style" });
    };
});

module.exports = styles;