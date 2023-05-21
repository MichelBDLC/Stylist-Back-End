const db = require('../db/dbConfig');

const getAllStyles = async queries => {
    try {
        //consoloe.log(queries);
        if (queries.favorite === 'true') {
            const allStyles = await db.any (
                'SELECT * FROM styles WHERE is_favorite=true'
            );
            return allStyles;
        }
        else {
            const allStyles = await db.any('SELECT * FROM styles');
            return allStyles;
        }
    }
    catch (error) {
        return error;
    }
};

const getStyle = async id => {
    try {
        const TheStyle = await db.one('SELECT * FROM styles WHERE id=$1', id);
        return TheStyle;
    }
    catch (error) {
        return error;
    }
};

const createStyle = async style => {
    try {
        const newStyle = await db.one (
            'INSERT INTO styles (name, category, style, price, is_favorite, url, img) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [
                style.name,
                style.category,
                style.style,
                style.price,
                style.is_favorite,
                style.url,
                style.img
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
            'DELETE FROM styles WHERE id=$1 RETURNING *',
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
            'UPDATE styles SET name=$1, category=$2, style=$3, price=$4, is_favorite=$5, url=$6, img=$7 WHERE id=$8 RETURNING *',
            [
                style.name,
                style.category,
                style.style, 
                style.price, 
                style.is_favorite,
                style.url,
                style.img,
                id
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