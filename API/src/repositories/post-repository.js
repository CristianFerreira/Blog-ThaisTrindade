'use strict';

const mongoose = require('mongoose');
const Post = mongoose.model('Post');


exports.get = async() => {
   const res = await Post.find({active: true}).populate('author','name email').sort({date: -1});
   return res;
}

exports.getInactive = async() => {
    const res = await Post.find({active: false}).populate('author','name email').sort({date: -1});
    return res;
 }

exports.getByContinent = async(continent) => {
    const res = await Post.find({active: true, continent: continent}).populate('author','name email').sort({date: -1});
    return res;
}

exports.getAllContinents = async() => {
    const res = await Post.find({active: true, "continent":{$ne:null}},'continent').populate('author','name email').sort({date: -1});
    return res;
}

exports.getById = async(id) => {
     const res = await Post.findById(id).populate('author','name email');
     return res;
}

exports.getByTag = async(tag) => {
     const res = await Post.find({active: true, tags: tag}).populate('author','name email').sort({date: -1});
     return res;
}

exports.getAllTags = async() => {
    const res = await Post.distinct("tags", { "active": true, "tags":{$ne:null} });   
     return res;
}

exports.getByCategory = async(category) => {
     const res = await Post.find({active: true, category: category}).populate('author','name email').sort({date: -1});
     return res;
}

exports.getBySearch = async(search) => {
    const posts = await Post.find({active: true, title: search}).populate('author','name email').sort({date: -1});
    if(posts == ""){
        return await Post.find({active: true, tags: search}).populate('author','name email').sort({date: -1});
    }
    return posts;
  
    
}


exports.getAllCategory = async() => {
    const res = await Post.find({active: true, "category":{$ne:null}}, 'category');
    return res;
}


exports.post = async(post) => {
    var post = new Post(post);
    await post.save();
}

exports.put = async(req) => {
        console.log(req.body.id);
        await Post.findByIdAndUpdate(req.body._id, {
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
            tags: req.body.tags,
            active: req.body.active
        }
    });
}

exports.delete = async(id) => {
    await Post.remove({_id: id});
}
