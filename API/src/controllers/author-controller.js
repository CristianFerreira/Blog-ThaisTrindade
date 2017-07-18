'use strict';

const repository = require('../repositories/author-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({ message: 'Falha ao buscar os autores', data: e });
    }
};

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send({ data });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao buscar postagem', data: e });
    }
};


exports.post = async (req, res, next) => {
    try {
        await repository.post({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ["user"]
        });
        res.status(201).send({ message: 'Usuario criado com sucesso!' });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao criar usuario', data: e });
    }
};

exports.put = async (req, res, next) => {
    try {
        await repository.put(req.params.id, req);
        res.status(200).send({ message: "Usuario atualizado com sucesso!" });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao atualizar usuario', data: e });
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


exports.authenticate = async (req, res, next) => {
    try {
        const author = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!author) {
            res.status(404).send({
               message: 'Usuário ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
            id: author._id,
            email: author.email,
            name: author.name,
            roles: author.roles
        });


        res.status(201).send({
            token: token,
            data: {
                email: author.email,
                name: author.name,
                roles: author.roles
            }
        });
    } catch (e) {
        res.status(400).send({ message: 'Erro ao gerar token', data: e });
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        
        const author = await repository.getById(data._id);

        if (!author) {
            res.status(404).send({
               message: 'Usuário não encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: author._id,
            email: author.email,
            name: author.name
        });

        console.log(token);

        res.status(201).send({
            token: token,
            data: {
                email: author.email,
                name: author.name
            }
        });
    } catch (e) {
        res.status(400).send({ message: 'Erro ao gerar token', data: e });
    }
};