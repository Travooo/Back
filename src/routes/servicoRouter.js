const express = require("express");
const ServicoController = require("../controllers/ServicoController");
const servicoRouter = express.Router();

servicoRouter.post("/", ServicoController.create);
servicoRouter.get("/:id", ServicoController.getById);
servicoRouter.get("/", ServicoController.getAll);
servicoRouter.put("/:id", ServicoController.update);
servicoRouter.delete("/:id", ServicoController.delete);

module.exports = servicoRouter;
