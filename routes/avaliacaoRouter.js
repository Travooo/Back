const express = require('express')
const AvaliacaoController = require('../controller/AvaliacaoController')
const avaliacaoRouter = express.Router()
const verificaToken = require('../middlewares/verificaToken');

avaliacaoRouter.post('/avaliacao', verificaToken, AvaliacaoController.create)
avaliacaoRouter.get('/avaliacao/:id', verificaToken, AvaliacaoController.getById)
avaliacaoRouter.get('/avaliacao', verificaToken, AvaliacaoController.getAll)
avaliacaoRouter.put('/avaliacao/:id', verificaToken, AvaliacaoController.update)
avaliacaoRouter.delete('/avaliacao/:id', verificaToken, AvaliacaoController.delete)

module.exports = avaliacaoRouter
