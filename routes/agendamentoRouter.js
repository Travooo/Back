const express = require("express");
const AgendamentoController = require("../controller/AgendamentoController");
const agendamentoRouter = express.Router();

agendamentoRouter.post("/agendamento", AgendamentoController.create);
agendamentoRouter.get("/agendamento", AgendamentoController.getAll);
agendamentoRouter.get("/agendamento/:id", AgendamentoController.getById);
agendamentoRouter.put("/agendamento/:id", AgendamentoController.update);
agendamentoRouter.delete("/agendamento/:id", AgendamentoController.delete);

module.exports = agendamentoRouter;
