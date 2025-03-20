const express = require('express');
const router = express.Router();
const controllerUser = require('../controller/controllerUser');

router.get('/users', controllerUser.getUsuarios);
router.get('/users/:id',controllerUser.getUsuarioById);
router.post('/users', controllerUser.createUsuario);
router.delete('/users/:id', controllerUser.deleteUsuario);
router.patch('/users/:id', controllerUser.updateUsuario);

module.exports = router;