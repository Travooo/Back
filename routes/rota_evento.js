const express = require('express');
const router = express.Router();
const controllerEvento = require('../controller/controllerEvento');

router.get('/eventos', controllerEvento.getEventos);
router.get('/eventos/:id', controllerEvento.getEventoById);
router.post('/eventos', controllerEvento.createEvento);
router.delete('/eventos/:id', controllerEvento.deleteEvento);
router.patch('/eventos/:id', controllerEvento.updateEvento);

module.exports = router;
