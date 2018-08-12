'use strict';

const repository = require('../repositories/user-notification-email-repository');


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
        const email = await exports.getByEmail(req.body.email)
        if(email == ""){
            await repository.post({
                email: req.body.email      
            });
            res.status(201).send({ message: 'Email cadastrado com sucesso!' });       
        } else {
            res.status(200).send({ message: "E-mail já está ativado" });
        }   
    } catch (e) {
        res.status(400).send({ message: 'Falha ao cadastrar email', data: e });
    }
};


exports.delete = async (req, res, next) => {
    try {;
        const email = await exports.getByEmail(req.params.email)
        if(email == ""){
            res.status(200).send({ message: "Email não foi ativado" });
        } else {
            await repository.delete(email[0]._id);
            res.status(200).send({ message: "Notificação desativada com sucesso!" });
        }
        
        
    } catch (e) {
        res.status(400).send({ message: 'Falha ao remover usuario', data: e });
    }
};

exports.getByEmail = (email) => {
    return repository.getByEmail(email);
}
