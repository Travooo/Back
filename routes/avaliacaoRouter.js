const AvaliacaoController = require("../controllers/AvaliacaoController");
const express = require("express");
const avaliacaoRouter = express.Router();

avaliacaoRouter.post("/", AvaliacaoController.create);
avaliacaoRouter.get("/:id", AvaliacaoController.get_by_id);
avaliacaoRouter.get("/", AvaliacaoController.get_all);
avaliacaoRouter.put("/:id", AvaliacaoController.update);
avaliacaoRouter.delete("/:id", AvaliacaoController.delete);

module.exports = avaliacaoRouter;
