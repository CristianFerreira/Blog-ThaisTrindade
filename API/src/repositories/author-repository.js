'use strict';

const mongoose = require('mongoose');
const Author = mongoose.model('Author');


exports.get = async() => {
   const res = await Author.find({});
   return res;
}

exports.getById = async(id) => {
     const res = await Author.findById(id);
     return res;
}

exports.post = async(author) => {
    var author = new Author(author);
    await author.save();
}

exports.put = async(id, req) => {
        await Author.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }
    });
}

exports.delete = async(id) => {
     await Author.findOneAndRemove(id);
}

exports.authenticate = async (data) => {
    const res = await Author.findOne({
        email: data.email, 
        password: data.password
    });
    return res;
}

