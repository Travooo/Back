const UsuarioController = require('../controllers/UsuarioController');
const express = require('express');
const usuarioRouter = express.Router();

usuarioRouter.post('/', UsuarioController.create);
usuarioRouter.get('/', UsuarioController.getAll);
usuarioRouter.get('/:id', UsuarioController.getById);
usuarioRouter.put('/:id', UsuarioController.update);
usuarioRouter.delete('/:id', UsuarioController.delete);

module.exports = usuarioRouter;
