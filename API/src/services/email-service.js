'use strict';
var config = require ('../config');
var sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = async (to, from, subject, body) => {
    sendgrid.send({
        to: to,
        from: from,
        subject: subject,
        html: body
    });
}