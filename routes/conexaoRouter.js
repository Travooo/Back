const ConexaoController = require("../controllers/ConexaoController");
const express = require("express");
const conexaoRouter = express.Router();

conexaoRouter.post("/", ConexaoController.create);
conexaoRouter.get("/:id", ConexaoController.get_by_id);
conexaoRouter.get("/", ConexaoController.get_all);
conexaoRouter.put("/:id", ConexaoController.update);
conexaoRouter.delete("/:id", ConexaoController.delete);

module.exports = conexaoRouter;
