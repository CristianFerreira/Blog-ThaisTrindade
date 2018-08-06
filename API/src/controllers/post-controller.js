'use strict';

const repository = require('../repositories/post-repository');

exports.get = (req, res) => {
    repository.get(req.params.page)
        .then(posts => {
            repository.postsCount().then(count => {
                let data = {}
                data.posts = posts
                data.count = count
                res.status(200).send({ data });
            }).catch(e => {
                res.status(400).send({ message: 'Falha ao buscar postagem', data: e });
            })
        }).catch(e => {
            res.status(400).send({ message: 'Falha ao buscar postagem', data: e });
        })
};

exports.getInactive = (req, res) => {
    repository.getInactive().then((data) => {
        res.status(200).send(data);
    }).catch((e) => { res.status(400).send({ message: 'Falha ao buscar as postagens', data: e }); })
};

exports.getByContinent = (req, res) => {
    repository.getByContinent(req.params.continent)
        .then((data) => {
            res.status(200).send({ data });
        }).catch((e) => { res.status(400).send({ message: 'Falha ao buscar as postagens', data: e }); })
};

exports.getAllContinents = (req, res) => {
    repository.getAllContinents()
        .then((data) => {
            res.status(200).send({ data });
        }).catch((e) => {
            res.status(400).send({ message: 'Falha ao buscar as postagens', data: e });
        })
};

exports.getById = async (req, res) => {
    repository.getById(req.params.id)
        .then((data) => {
            res.status(200).send({ data });
        }).catch((e) => {
            res.status(400).send({ message: 'Falha ao buscar postagem', data: e });
        })
};

exports.getByTag = (req, res) => {
    repository.getByTag(req.params.tag)
        .then((data) => {
            res.status(200).send({ data });
        }).catch((e) => { res.status(400).send({ message: 'Falha ao buscar tag', data: e }); })
};

exports.getAllTags = (req, res) => {
    repository.getAllTags()
        .then((data) => {
            res.status(200).send({ data });
        }).catch((e) => { res.status(400).send({ message: 'Falha ao buscar tags', data: e }); })
};

exports.getTagsMostUsed = (req, res) => {
    repository.getTagsMostUsed()
    .then((data) => {
        res.status(200).send({ data });
    }).catch((e) => { res.status(400).send({ message: 'Falha ao buscar tags', data: e }); })
};

exports.getByCategory = (req, res) => {
    repository.getByCategory(req.params.category)
        .then(data => {
            res.status(200).send({ data });
        }).catch(e => {
            res.status(400).send({ message: 'Falha ao buscar postagem', data: e });
        })
};

exports.getBySearch = (req, res) => {
    repository.getByTitle(req.params.search)
        .then(data => {
            if(data == ""){
                repository.getByTag(req.params.search).then((data) => {
                    res.status(200).send({ data });
                }).catch(e => {
                    res.status(400).send({ message: 'Falha ao buscar pesquisa', data: e });
                })
            }
            else { res.status(200).send({ data }); }        
        }).catch(e => {
            res.status(400).send({ message: 'Falha ao buscar pesquisa', data: e });
        })
};

exports.getAllPostsToSearch = (req, res) => {
    repository.getAllPostsToSearch()
        .then(data => {
            res.status(200).send({ data });
        }).catch(e => {
            res.status(400).send({ message: 'Falha ao buscar pesquisa', data: e });
        })
};


exports.getAllCategory = (req, res) => {
    repository.getAllCategory()
        .then(data => {
            res.status(200).send({ data });
        }).catch(e => {
            res.status(400).send({ message: 'Falha ao buscar postagem', data: e });
        })
};

exports.post = async (req, res) => {
    try {
        await repository.post(req.body);
        res.status(201).send({ message: 'Postagem criada com sucesso!' });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao criar postagem', data: e });
    }
};

exports.put = async (req, res) => {
    try {
        if (req.body.updateDate) {
            req.body.date = new Date();
        }
        await repository.put(req);
        res.status(200).send({ message: "Postagem atualizada com sucesso!" });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao atualizar postagem', data: e });
    }
};

exports.delete = async (req, res) => {
    try {
        await repository.delete(req.params.id);
        res.status(200).send({ message: "Postagem removida com sucesso!" });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao remover postagem', data: e });
    }
};

