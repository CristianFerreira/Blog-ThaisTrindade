'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const app = express();
const router = express.Router();

// Connecta no banco
mongoose.connect(config.connectionString);

// Carrega os models
const Post = require('./models/post');
const Author = require('./models/author');

// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const postRoute = require('./routes/post-route');
const authorRoute = require('./routes/author-route');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({extended: false}));

//Habilita o cors
app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/post', postRoute);
app.use('/author', authorRoute);

module.exports = app;