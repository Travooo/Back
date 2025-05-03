const express = require("express");
const PagamentoController = require("../controllers/PagamentoController");
const pagamentoRouter = express.Router();

pagamentoRouter.post("/", PagamentoController.create);
pagamentoRouter.get("/:id", PagamentoController.getById);
pagamentoRouter.get("/:id/status", PagamentoController.getStatus);
pagamentoRouter.get("/", PagamentoController.getAll);
pagamentoRouter.put("/:id/status", PagamentoController.updateStatus);
pagamentoRouter.put("/:id", PagamentoController.update);
pagamentoRouter.delete("/:id", PagamentoController.delete);

module.exports = pagamentoRouter;
