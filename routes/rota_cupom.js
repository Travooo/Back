const express = require('express');
const router = express.Router();
const controllerCupom = require('../controller/controllerCupom');
const verificaToken = require('../middlewares/verificaToken');

router.get('/cupons', verificaToken, controllerCupom.getCupons);
router.get('/cupons/:id', verificaToken, controllerCupom.getCupomById);
router.post('/cupons', verificaToken, controllerCupom.createCupom);
router.delete('/cupons/:id', verificaToken, controllerCupom.deleteCupom);
router.patch('/cupons/:id', verificaToken, controllerCupom.updateCupom);

module.exports = router;
