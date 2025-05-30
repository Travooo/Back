const express = require("express");
const PagamentoController = require("../controller/PagamentoController");
const pagamentoRouter = express.Router();
const verificaToken = require('../middlewares/verificaToken');

pagamentoRouter.post("/pagamento", verificaToken, PagamentoController.create);
pagamentoRouter.get("/pagamento/:id", verificaToken, PagamentoController.getById);
pagamentoRouter.get("/pagamento/:id/status", verificaToken, PagamentoController.getStatus);
pagamentoRouter.get("/pagamento", verificaToken, PagamentoController.getAll);
pagamentoRouter.put("/pagamento/:id/status", verificaToken, PagamentoController.updateStatus);
pagamentoRouter.put("/pagamento/:id", verificaToken, PagamentoController.update);
pagamentoRouter.delete("/pagamento/:id", verificaToken, PagamentoController.delete);

module.exports = pagamentoRouter;
