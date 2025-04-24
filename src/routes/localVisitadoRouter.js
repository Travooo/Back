const LocalVisitadoController = require("../controllers/LocalVisitadoController");
const express = require("express");
const localVisitadoRouter = express.Router();

localVisitadoRouter.post("/", LocalVisitadoController.create);
localVisitadoRouter.get("/:id", LocalVisitadoController.getById);
localVisitadoRouter.get("/", LocalVisitadoController.getAll);
localVisitadoRouter.put("/:id", LocalVisitadoController.update);
localVisitadoRouter.delete("/:id", LocalVisitadoController.delete);

module.exports = localVisitadoRouter;
