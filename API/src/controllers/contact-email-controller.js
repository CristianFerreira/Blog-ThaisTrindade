'use strict';

const repository = require('../repositories/contact-email-repository');


exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({ message: 'Falha ao buscar os Emails', data: e });
    }
};

exports.post = async (req, res) => {
    try {
        await repository.post({
            email: req.body.email      
        });
        res.status(201).send({ message: 'Email cadastrado com sucesso!' });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao cadastrar email', data: e });
    }
};


exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({ message: "Usuario removido com sucesso!" });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao remover usuario', data: e });
    }
};

