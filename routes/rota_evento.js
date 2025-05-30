const express = require('express');
const router = express.Router();
const controllerEvento = require('../controller/controllerEvento');
const verificaToken = require('../middlewares/verificaToken');

router.get('/eventos', verificaToken, controllerEvento.getEventos);
router.get('/eventos/:id', verificaToken, controllerEvento.getEventoById);
router.post('/eventos', verificaToken, controllerEvento.createEvento);
router.delete('/eventos/:id', verificaToken, controllerEvento.deleteEvento);
router.patch('/eventos/:id', verificaToken, controllerEvento.updateEvento);

module.exports = router;
