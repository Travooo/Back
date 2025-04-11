const EventoController = require("../controllers/EventoController");
const express = require("express");
const eventoRouter = express.Router();

eventouRouter.post("/", EventoController.create);
eventouRouter.get("/:id", EventoController.get_by_id);
eventouRouter.get("/", EventoController.get_all);
eventouRouter.put("/:id", EventoController.update);
eventouRouter.delete("/:id", EventoController.delete);

module.exports = eventoRouter;
