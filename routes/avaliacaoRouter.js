const express = require('express')
const AvaliacaoController = require('../controller/AvaliacaoController')
const avaliacaoRouter = express.Router()

avaliacaoRouter.post('/avaliacao', AvaliacaoController.create)
avaliacaoRouter.get('/avaliacao/:id', AvaliacaoController.getById)
avaliacaoRouter.get('/avaliacao', AvaliacaoController.getAll)
avaliacaoRouter.put('/avaliacao/:id', AvaliacaoController.update)
avaliacaoRouter.delete('/avaliacao/:id', AvaliacaoController.delete)

module.exports = avaliacaoRouter
