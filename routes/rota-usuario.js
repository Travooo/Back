const express = require('express');
const router = express.Router();
const controllerUser = require('../controller/controllerUser');

router.get('/usuarios', controllerUser.getUsuarios);
router.get('/usuarios/:id',controllerUser.getUsuarioById);
router.post('/usuarios', controllerUser.createUsuario);
router.delete('/usuarios/:id', controllerUser.deleteUsuario);
router.patch('/usuarios/:id', controllerUser.updateUsuario);

module.exports = router;