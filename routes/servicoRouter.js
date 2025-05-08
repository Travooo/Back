const express = require("express");
const ServicoController = require("../controller/ServicoController");
const servicoRouter = express.Router();

servicoRouter.post("/servico", ServicoController.create);
servicoRouter.get("/servico/:id", ServicoController.getById);
servicoRouter.get("/servico", ServicoController.getAll);
servicoRouter.put("/servico/:id", ServicoController.update);
servicoRouter.delete("/servico/:id", ServicoController.delete);

module.exports = servicoRouter;
