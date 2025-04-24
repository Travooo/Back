const express = require('express')
const AvaliacaoController = require('../controllers/AvaliacaoController')
const avaliacaoRouter = express.Router()

avaliacaoRouter.post('/', AvaliacaoController.create)
avaliacaoRouter.get('/:id', AvaliacaoController.getById)
avaliacaoRouter.get('/', AvaliacaoController.getAll)
avaliacaoRouter.put('/:id', AvaliacaoController.update)
avaliacaoRouter.delete('/:id', AvaliacaoController.delete)

module.exports = avaliacaoRouter
