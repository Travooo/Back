const express = require('express');
const router = express.Router();
const controllerConexao = require('../controller/controllerConexao');

router.get('/conexoes', controllerConexao.getConexoes);
router.get('/conexoes/:id',controllerConexao.getConexaoById);
router.post('/conexoes', controllerConexao.createConexao);
router.delete('/conexoes/:id', controllerConexao.deleteConexao);
router.patch('/conexoes/:id', controllerConexao.updateConexao);

module.exports = router;
