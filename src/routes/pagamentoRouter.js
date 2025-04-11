const PagamentoController = require("../controllers/PagamentoController");
const express = require("express");
const pagamentoRouter = express.Router();

pagamentoRouter.post("/", PagamentoController.create);
pagamentoRouter.get("/:id", PagamentoController.get_by_id);
pagamentoRouter.get("/:id/status", PagamentoController.get_status);
pagamentoRouter.get("/", PagamentoController.get_all);
pagamentoRouter.put("/:id/status", PagamentoController.update_status);
pagamentoRouter.delete("/:id", PagamentoController.delete);

module.exports = pagamentoRouter;
