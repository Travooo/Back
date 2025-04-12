const AgendamentoController = require('../controllers/AgendamentoController')
const express = require('express')
const agendamentoRouter = express.Router()

agendamentoRouter.post('/', AgendamentoController.create)
agendamentoRouter.get('/', AgendamentoController.getAll)
agendamentoRouter.get('/:id', AgendamentoController.getById)
agendamentoRouter.put('/:id', AgendamentoController.update)
agendamentoRouter.delete('/:id', AgendamentoController.delete)

module.exports = agendamentoRouter
