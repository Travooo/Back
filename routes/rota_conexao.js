const express = require('express');
const router = express.Router();
const controllerConexao = require('../controller/controllerConexao');
const verificaToken = require('../middlewares/verificaToken');

router.get('/conexoes', verificaToken, controllerConexao.getConexoes);
router.get('/conexoes/:id', verificaToken, controllerConexao.getConexaoById);
router.post('/conexoes', verificaToken, controllerConexao.createConexao);
router.delete('/conexoes/:id', verificaToken, controllerConexao.deleteConexao);
router.patch('/conexoes/:id', verificaToken, controllerConexao.updateConexao);

module.exports = router;
