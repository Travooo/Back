const EstabelecimentoController = require("../controllers/EstabelecimentoController");
const express = require("express");
const estabelecimentoRouter = express.Router();

estabelecimentoRouter.post("/", EstabelecimentoController.create);
estabelecimentoRouter.get("/:id", EstabelecimentoController.get_by_id);
estabelecimentoRouter.get("/", EstabelecimentoController.get_all);
estabelecimentoRouter.put("/:id", EstabelecimentoController.update);
estabelecimentoRouter.delete("/:id", EstabelecimentoController.delete);

module.exports = estabelecimentoRouter;
