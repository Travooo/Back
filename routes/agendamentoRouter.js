const AgendamentoController = require('../controllers/AgendamentoController');
const express = require('express');
const agendamentoRouter = express.Router();

agendamentoRouter.post('/', AgendamentoController.create);
agendamentoRouter.get('/', AgendamentoController.get_all);
agendamentoRouter.get('/:id', AgendamentoController.get_by_id);
agendamentoRouter.put('/:id', AgendamentoController.update);
agendamentoRouter.delete('/:id', AgendamentoController.delete);

module.exports = agendamentoRouter;
