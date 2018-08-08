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
        required: false
    },
    country: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false
    },
    tags: [{
        type: String,
        required: false
    }],
    active: {
        type: Boolean,
        required: false
    },
    updateDate: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model('Post', schema);