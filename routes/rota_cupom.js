const express = require('express');
const router = express.Router();
const controllerCupom = require('../controller/controllerCupom');
const verificaToken = require('../middlewares/verificaToken');

router.post('/cupons/:id/claim', verificaToken, controllerCupom.claimCupom);//implementar
router.post('/cupons/validar', verificaToken, controllerCupom.validarCupom);//implementar
router.get('/cuponsclientall', verificaToken, controllerCupom.getAllCupons);
router.get('/cuponsall', verificaToken, controllerCupom.getCuponsAll);
router.get('/cupons', verificaToken, controllerCupom.getCupons);
router.get('/cupons/:id', verificaToken, controllerCupom.getCupomById);
router.post('/cupons', verificaToken, controllerCupom.createCupom);
router.delete('/cupons/:id', verificaToken, controllerCupom.deleteCupom);
router.patch('/cupons/:id', verificaToken, controllerCupom.updateCupom);

module.exports = router;
