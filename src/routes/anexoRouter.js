const express = require("express");
const AnexoController = require("../controllers/AnexoController");
const anexoRouter = express.Router();

anexoRouter.post("/", AnexoController.create);
anexoRouter.get("/:id", AnexoController.getById);
anexoRouter.get("/", AnexoController.getAll);
anexoRouter.put("/:id", AnexoController.update);
anexoRouter.delete("/:id", AnexoController.delete);

module.exports = anexoRouter;
