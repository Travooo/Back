const express = require("express");
const LocalVisitadoController = require("../controller/LocalVisitadoController");
const localVisitadoRouter = express.Router();
const verificaToken = require('../middlewares/verificaToken');

localVisitadoRouter.post("/localvisitado", verificaToken, LocalVisitadoController.create);
localVisitadoRouter.get("/localvisitado/:id", verificaToken, LocalVisitadoController.getById);
localVisitadoRouter.get("/localvisitado", verificaToken, LocalVisitadoController.getAll);
localVisitadoRouter.put("/localvisitado/:id", verificaToken, LocalVisitadoController.update);
localVisitadoRouter.delete("/localvisitado/:id", verificaToken, LocalVisitadoController.delete);

module.exports = localVisitadoRouter;
