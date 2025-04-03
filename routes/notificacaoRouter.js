const NotificacaoController = require("../controllers/NotificacaoController");
const express = require("express");
const notificacaoRouter = express.Router();

notificacaoRouter.post("/", NotificacaoController.create);
notificacaoRouter.get("/:id", NotificacaoController.get_by_id);
notificacaoRouter.get("/", NotificacaoController.get_all);
notificacaoRouter.put("/:id", NotificacaoController.update);
notificacaoRouter.delete("/:id", NotificacaoController.delete);

module.exports = notificacaoRouter;
