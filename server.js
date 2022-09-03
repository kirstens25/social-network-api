const express = require('express');
require('dotenv').config();

const db = require('./config/connection');

const app = express();

const PORT = process.env.PORT || 3001;

const routes = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);

app.listen(PORT, () => {
  console.log('running at http://localhost:' + PORT);
})