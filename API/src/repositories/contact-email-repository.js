'use strict';

const mongoose = require('mongoose');
const ContactEmail = mongoose.model('ContactEmail');



exports.post = async(email) => {
    var contactEmail = new ContactEmail(email);
    await contactEmail.save();
}


exports.delete = async(id) => {
     await Author.findOneAndRemove(id);
}


exports.get = async() => {
    const res = await ContactEmail.find({});
    return res;
 }