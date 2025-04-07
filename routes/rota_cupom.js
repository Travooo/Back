const express = require('express');
const router = express.Router();
const controllerCupom = require('../controller/controllerCupom');

router.get('/cupons', controllerCupom.getCupons);
router.get('/cupons/:id', controllerCupom.getCupomById);
router.post('/cupons', controllerCupom.createCupom);
router.delete('/cupons/:id', controllerCupom.deleteCupom);
router.patch('/cupons/:id', controllerCupom.updateCupom);

module.exports = router;
