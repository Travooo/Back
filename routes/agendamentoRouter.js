const express = require("express");
const AgendamentoController = require("../controller/AgendamentoController");
const agendamentoRouter = express.Router();
const verificaToken = require('../middlewares/verificaToken');

agendamentoRouter.post("/agendamento", verificaToken, AgendamentoController.create);
agendamentoRouter.get("/agendamento", verificaToken, AgendamentoController.getAll);
agendamentoRouter.get("/agendamento/:id", verificaToken, AgendamentoController.getById);
agendamentoRouter.put("/agendamento/:id", verificaToken, AgendamentoController.update);
agendamentoRouter.delete("/agendamento/:id", verificaToken, AgendamentoController.delete);

module.exports = agendamentoRouter;
