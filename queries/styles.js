const db = require('../db/dbConfig');

const getAllStyles = async queries => {

    try {
        consoloe.log(queries);
        if (queries.favorite === 'true') {
            const allStyles = await db.any (
                'SELECT * FROM styles WHERE is_favorite=true'
            );
            return allStyles;
        }
        else {
            const allStyles = await db.any('SELECT * FROM snacks');
            return allStyles;
        }
    }
    catch (error) {
        return error;
    }
};

const getStyle = async id => {
    try {
        const TheStyle = await db.one('SELECT * FROM snacks WHERE id=$1', id);
        return TheStyle;
    }
    catch (error) {
        return error;
    }
};

const createStyle = async style => {
    try {
        const newStyle = await db.one (
            'INSERT INTO styles (name, category, url, image, price, is_favorite) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [
                style.name,
                style.category,
                style.url,
                style.image,
                style.price,
                style.is_favorite,
            ]
        );
        return newStyle;
    } 
    catch (error) {
        return error;
    }
};

const deleteStyle = async id => {
    try {
        const deletedStyle = await db.one (
            'DELETE FROM snacks WHERE id=$1 RETURNING *',
            id
        );
        return deletedStyle;
    }
    catch (error) {
        return error;
    }
};

const updateStyle = async (id, style) => {
    try {
        const updatedStyle = await db.one (
            'UPDATE styles SET name=$1, category=$2, url=$3, image=$4, price=$5, is_favorite=$6 WHERE id=$7 RETURNING *',
            [
                style.name,
                style.category, 
                style.url, 
                style.image, 
                style.price, 
                style.is_favorite,
                id,
            ]
        );
        return updatedStyle;
    }
    catch (error) {
        return error;
    }
};

module.exports = {
    getAllStyles,
    getStyle,
    createStyle,
    deleteStyle,
    updateStyle,
};