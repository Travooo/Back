const express = require("express");
const UsuarioOrganizacaoController = require("../controllers/UsuarioOrganizacaoController");
const usuarioOrganizacaoRouter = express.Router();

usuarioOrganizacaoRouter.post("/", UsuarioOrganizacaoController.create);
usuarioOrganizacaoRouter.get("/", UsuarioOrganizacaoController.getAll);
usuarioOrganizacaoRouter.get("/:id", UsuarioOrganizacaoController.getById);
usuarioOrganizacaoRouter.put("/:id", UsuarioOrganizacaoController.update);
usuarioOrganizacaoRouter.delete("/:id", UsuarioOrganizacaoController.delete);

module.exports = usuarioOrganizacaoRouter;
