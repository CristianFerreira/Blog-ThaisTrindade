'use strict';

const repository = require('../repositories/post-repository');

exports.get = async(req, res) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({message: 'Falha ao buscar as postagens', data: e});
    }
};

exports.getInactive = async(req, res) => {
    try {
        var data = await repository.getInactive();
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({message: 'Falha ao buscar as postagens', data: e});
    }
};

exports.getByContinent = async(req, res) => {
    try {
        var data = await repository.getByContinent(req.params.continent);
        res.status(200).send({data});
    } catch (e) {
        res.status(400).send({message: 'Falha ao buscar as postagens', data: e});
    }
}; 

exports.getAllContinents = async(req, res) => {
    try {
        var data = await repository.getAllContinents();
        res.status(200).send({data});
    } catch (e) {
        res.status(400).send({message: 'Falha ao buscar as postagens', data: e});
    }
}; 

exports.getById = async(req, res) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send({data});
    } catch (e) {
        res.status(400).send({message: 'Falha ao buscar postagem', data: e});
    }
};

exports.getByTag = async(req, res) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send({data});
    } catch (e) {
        res.status(400).send({message: 'Falha ao buscar tag', data: e});
    }
};

exports.getAllTags = async(req, res) => {
    try {
        var data = await repository.getAllTags();
        res.status(200).send({data});
    } catch (e) {
        res.status(400).send({message: 'Falha ao buscar tags', data: e});
    }
};

exports.getByCategory = async(req, res) => {
    repository.getByCategory(req.params.category)
    .then(data => {
        res.status(200).send({data});
    }).catch(e => {
        res.status(400).send({message: 'Falha ao buscar postagem', data: e});
    })
};

exports.getAllCategory  = async(req, res) => {
    repository.getAllCategory()
    .then(data => {
        res.status(200).send({data});
    }).catch(e => {
        res.status(400).send({message: 'Falha ao buscar postagem', data: e});
    })
};

exports.post = async(req, res) => {
    try {
        await repository.post(req.body);
        res.status(201).send({message: 'Postagem criada com sucesso!'});
    } catch (e) {
        res.status(400).send({message: 'Falha ao criar postagem', data: e});
    }
};

exports.put = async(req, res) => {
    try {
        await repository.put(req);
        res.status(200).send({message: "Postagem atualizada com sucesso!"});
    } catch (e) {
        res.status(400).send({message: 'Falha ao atualizar postagem', data: e});
    }
};

exports.delete = async(req, res) => {
    try {
        await repository.delete(req.params.id);
        res.status(200).send({message: "Postagem removida com sucesso!"});
    } catch (e) {
        res.status(400).send({message: 'Falha ao remover postagem', data: e});
    }
};

