const express = require('express');
const styles = express.Router();

const {
    getAllStyles, getStyle, createStyle, deleteStyle, updateStyle
} = require("../queries/styles");

styles.get('/', async (request, response) => {
    const allStyles = await getAllStyles(request.query);

    if (allStyles[0]) {
        response.status(200).json(allStyles);
    }
    else {
        response.status(500).json({ error: "server error" });
    };
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
        const newStyle = await createStyle(request.body);
        response.status(200).json(newStyle);
    }
    else {
        response.status(404).json({ error: "cannot create style" });
    };
});

styles.delete('/:id', async (request, response) => {
    const { id } = request.params;
    const deletedStyle = await deleteStyle(id);

    if (deletedStyle.id) {
        response.status(200).json(deletedStyle);
    }
    else {
        response.status(404).json({ error: "cannot delete style" });
    };
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