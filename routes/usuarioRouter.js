const UsuarioController = require('../controllers/UsuarioController');
const express = require('express');
const usuarioRouter = express.Router();

usuarioRouter.post('/', UsuarioController.create);
usuarioRouter.get('/', UsuarioController.get_all);
usuarioRouter.get('/:id', UsuarioController.get_by_id);
usuarioRouter.put('/:id', UsuarioController.update);
usuarioRouter.delete('/:id', UsuarioController.delete);

module.exports = usuarioRouter;
