'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();

// Connecta no banco
mongoose.connect('mongodb://cristian:cri022010@ds034807.mlab.com:34807/blog')

// Carrega os models
const Post = require('./models/post');
const Author = require('./models/author');

// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const postRoute = require('./routes/post-route');
const authorRoute = require('./routes/author-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/', indexRoute);
app.use('/post', postRoute)
app.use('/author', authorRoute)

module.exports = app;