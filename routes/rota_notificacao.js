const express = require('express');
const router = express.Router();
const controllerNotificacao = require('../controller/controllerNotificacao');

router.get('/notificacoes', controllerNotificacao.getNotificacoes);
router.get('/notificacoes/:id', controllerNotificacao.getNotificacaoById);
router.post('/notificacoes', controllerNotificacao.createNotificacao);
router.delete('/notificacoes/:id', controllerNotificacao.deleteNotificacao);
router.patch('/notificacoes/:id', controllerNotificacao.updateNotificacao);

module.exports = router;
