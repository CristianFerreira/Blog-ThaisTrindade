'use strict';

const emailService = require('../services/email-service');

exports.sendContact = (req, res) => {
    try {
        const contact = req.body;
        const body = global.EMAIL_TMPL_CONTACT.replace("{name}", contact.name);
        emailService.send("cristianferreira.gks@gmail.com", contact.email, contact.subject, body.replace("{message}", contact.message))
        res.status(201).send({ message: 'Email enviado com sucesso' });
    }
    catch (e) {
        res.status(400).send({ message: 'Falha ao criar postagem', data: e });
    }
}