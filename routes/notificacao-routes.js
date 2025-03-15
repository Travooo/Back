const express = require('express');
const NotificacoesService = require('../services/notificacao-service');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const result = await NotificacoesService.createNotificacao(data);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await NotificacoesService.getNotificacaoById(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await NotificacoesService.getAllNotificacoes();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await NotificacoesService.deleteNotificacao(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;