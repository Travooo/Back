const express = require("express");
const AnexoController = require("../controller/AnexoController");
const anexoRouter = express.Router();

anexoRouter.post("/anexo", AnexoController.create);
anexoRouter.get("/anexo/:id", AnexoController.getById);
anexoRouter.get("/anexo", AnexoController.getAll);
anexoRouter.put("/anexo/:id", AnexoController.update);
anexoRouter.delete("/anexo/:id", AnexoController.delete);

module.exports = anexoRouter;
