const express = require('express');
const router = express.Router();
const authController = require('../controller/controllerAuth');

router.post('/login', authController.login);
router.post('/cadastro', authController.cadastrar);

module.exports = router;