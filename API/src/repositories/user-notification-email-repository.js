'use strict';

const mongoose = require('mongoose');
const UserNotificationEmail = mongoose.model('UserNotificationEmail');



exports.post = (email) => {
    var userNotificationEmail = new UserNotificationEmail(email);
    userNotificationEmail.save();
}


exports.delete = async (id) => { 
    await UserNotificationEmail.findByIdAndRemove(id)
}


exports.get = async() => {
    const res = await UserNotificationEmail.find({});
    return res;
 }

 exports.getByEmail = (email) => {
    return UserNotificationEmail.find({email: email});
 }