'use strict';

const mongoose = require('mongoose');
const Post = mongoose.model('Post');


exports.get = async() => {
   const res = await Post.find({}).populate('author','name email');
   return res;
}

exports.getByContinent = async(continent) => {
    const res = await Post.find({continent: continent}).populate('author','name email');
    return res;
}

exports.getById = async(id) => {
     const res = await Post.findById(id).populate('author','name email');
     return res;
}

exports.getByTag = async(tag) => {
     const res = await Post.find({tags: tag}).populate('author','name email');
     return res;
}

exports.getByCategory = async(category) => {
     const res = await Post.find({category: category}).populate('author','name email');
     return res;
}

exports.post = async(post) => {
    var post = new Post(post);
    await post.save();
}

exports.put = async(id, req) => {
        await Post.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            category: req.body.category,
            author: req.body.author,
            continent: req.body.continent,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            tags: req.body.tags
        }
    });
}

exports.delete = async(id) => {
     await Post.findOneAndRemove(id);
}
