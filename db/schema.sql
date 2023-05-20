DROP DATABASE IF EXISTS styles_dev;

CREATE DATABASE styles_dev;

\c styles_dev;

CREATE TABLE styles (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    url TEXT,
    image TEXT, -- might need to add url after image ??
    price FLOAT,
    is_favorite BOOLEAN
);


