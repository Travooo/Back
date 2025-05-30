const express = require('express');
const router = express.Router();
const controllerNotificacao = require('../controller/controllerNotificacao');
const verificaToken = require('../middlewares/verificaToken');

router.get('/notificacoes', verificaToken, controllerNotificacao.getNotificacoes);
router.get('/notificacoes/:id', verificaToken, controllerNotificacao.getNotificacaoById);
router.post('/notificacoes', verificaToken, controllerNotificacao.createNotificacao);
router.delete('/notificacoes/:id', verificaToken, controllerNotificacao.deleteNotificacao);
router.patch('/notificacoes/:id', verificaToken, controllerNotificacao.updateNotificacao);

module.exports = router;
