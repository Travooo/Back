const express = require("express");
const LocalVisitadoController = require("../controller/LocalVisitadoController");
const localVisitadoRouter = express.Router();

localVisitadoRouter.post("/localvisitado", LocalVisitadoController.create);
localVisitadoRouter.get("/localvisitado/:id", LocalVisitadoController.getById);
localVisitadoRouter.get("/localvisitado", LocalVisitadoController.getAll);
localVisitadoRouter.put("/localvisitado/:id", LocalVisitadoController.update);
localVisitadoRouter.delete("/localvisitado/:id", LocalVisitadoController.delete);

module.exports = localVisitadoRouter;
