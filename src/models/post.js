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
        type:
    }

});

module.exports = mongoose.model('Post', schema);



     public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public string Hashtag { get; set; }
        public DateTime Date { get; set; }
        public string Picture { get; set; }
        public string Video { get; set; }
        public string icon { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public int CityId { get; set; }
        public City City { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }