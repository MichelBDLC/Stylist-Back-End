const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const stylesController = require('./controllers/stylesController');
app.use('/styles', stylesController);

app.get('/', (_, response) => {
    response.status(200).send('welcome to The No Stylist App');
});

app.get('*', (_, response) => {
    response.status(404).send('Page not found');
});

module.exports = app;