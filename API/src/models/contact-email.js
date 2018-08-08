'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('ContactEmail', schema);