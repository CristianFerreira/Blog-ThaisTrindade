'use strict';

const mongoose = require('mongoose');
const Post = mongoose.model('Post');


exports.get = (pageNumber) => {
     return Post.find({ active: true }).populate('author', 'name email').skip(pageNumber > 0 ? ((pageNumber - 1) * 4) : 0)
        .limit(4).sort({date: -1});

}

exports.postsCount = () => {
    return Post.find({ active: true }).count();
}


exports.getInactive = () => {
    return Post.find({ active: false }).populate('author', 'name email').sort({ date: -1 });
}

exports.getByContinent = (continent) => {
    return Post.find({ active: true, continent: continent }).populate('author', 'name email').sort({ date: -1 });
}

exports.getAllContinents = () => {
    return Post.distinct("continent", { active: true, "continent": { $ne: null } });
}

exports.getById = (id) => {
    return  Post.findById(id).populate('author', 'name email');
}

exports.getByTag = (tag) => {
    return Post.find({ active: true, tags: tag }).populate('author', 'name email').sort({ date: -1 });
}

exports.getAllTags = () => {
    return Post.distinct("tags", { "active": true, "tags": { $ne: null } });
}


exports.getTagsMostUsed = () => {
    return Post.aggregate([{ $unwind: "$tags" }, { $sortByCount: "$tags" }]).limit(10)
}


exports.getByCategory = (category) => {
    return Post.find({ active: true, category: category }).populate('author', 'name email').sort({ date: -1 });
}


exports.getByTitle = (text) => {
    return Post.find({ active: true, title: text, title: text + "?" }).populate('author', 'name email').sort({ date: -1 });;
}



exports.getAllPostsToSearch = () => {
    return Post.find({ active: true},"title date category").sort({ date: -1 });
}


exports.getAllCategory = () => {
    return Post.distinct("category", { active: true, "category": { $ne: null } });

}

exports.post = (post) => {
    var post = new Post(post);
    post.save();
}

exports.put = async (req) => {
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
            active: req.body.active,
            updateDate: req.body.updateDate
        }
    });
}

exports.delete = async (id) => {
    await Post.remove({ _id: id });
}
