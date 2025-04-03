const AnexoController = require("../controllers/AnexoController");
const express = require("express");
const anexoRouter = express.Router();

anexoRouter.post("/", AnexoController.create);
anexoRouter.get("/:id", AnexoController.get_by_id);
anexoRouter.get("/", AnexoController.get_all);
anexoRouter.put("/:id", AnexoController.update);
anexoRouter.delete("/:id", AnexoController.delete);

module.exports = anexoRouter;
