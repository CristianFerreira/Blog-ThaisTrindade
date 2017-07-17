'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    category: {
            type: String,
            required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    continent: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: false
    }]   
});

module.exports = mongoose.model('Post', schema);