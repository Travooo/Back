const express = require("express");
const PagamentoController = require("../controller/PagamentoController");
const pagamentoRouter = express.Router();

pagamentoRouter.post("/pagamento", PagamentoController.create);
pagamentoRouter.get("/pagamento/:id", PagamentoController.getById);
pagamentoRouter.get("/pagamento/:id/status", PagamentoController.getStatus);
pagamentoRouter.get("/pagamento", PagamentoController.getAll);
pagamentoRouter.put("/pagamento/:id/status", PagamentoController.updateStatus);
pagamentoRouter.put("/pagamento/:id", PagamentoController.update);
pagamentoRouter.delete("/pagamento/:id", PagamentoController.delete);

module.exports = pagamentoRouter;
