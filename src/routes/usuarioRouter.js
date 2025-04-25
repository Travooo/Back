const express = require("express");
const UsuarioController = require("../controllers/UsuarioController");
const usuarioRouter = express.Router();

usuarioRouter.post("/", UsuarioController.create);
usuarioRouter.get("/", UsuarioController.getAll);
usuarioRouter.get("/:id", UsuarioController.getById);
usuarioRouter.get("/:email", UsuarioController.getByEmail);
usuarioRouter.put("/:id", UsuarioController.update);
usuarioRouter.delete("/:id", UsuarioController.delete);

module.exports = usuarioRouter;
