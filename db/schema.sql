DROP DATABASE IF EXISTS styles_dev;

CREATE DATABASE styles_dev;

\c styles_dev;

CREATE TABLE styles (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    style TEXT,
    price FLOAT,
    is_favorite BOOLEAN,
    url TEXT,
    img TEXT
);


