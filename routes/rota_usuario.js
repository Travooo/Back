const express = require('express');
const router = express.Router();
const controllerUser = require('../controller/controllerUser');
const verificaToken = require('../middlewares/verificaToken');

//rotas com token
router.get('/usuarios', verificaToken, controllerUser.getUsuarios);
router.get('/usuarios/:id', verificaToken, controllerUser.getUsuarioById);
router.delete('/usuarios/:id', verificaToken, controllerUser.deleteUsuario);
router.patch('/usuarios/:id', verificaToken, controllerUser.updateUsuario);
router.patch('/usuarios/:id/senha', verificaToken, controllerUser.changePassword);

//rotas sem token
router.post('/usuarios', controllerUser.createUsuario);
router.post('/usuario/login', controllerUser.loginUsuario);

module.exports = router;