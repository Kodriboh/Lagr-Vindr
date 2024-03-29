'use strict';

require('dotenv').config();

const db = include('/utils/databaseSelector.js');
const path = require('path');
const express = require('express');
const app = express();

app.config = include('/config/app');
app.dbconfig = db;

app.use(express.static(path.join('./', 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join('./', 'views'));

app.start = include('/utils/overrides.js').listen(app);
app.mongoConnect = include('/utils/overrides.js').mongoConnect;

const webRoutes = include('/routes/web');
const apiRoutes = include('/routes/api');

app.use(apiRoutes);
app.use(webRoutes);

module.exports = { app };