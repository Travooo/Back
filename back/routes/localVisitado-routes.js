const express = require('express');
const LocalVisitadoService = require('../services/localVisitado-service');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const result = await LocalVisitadoService.createLocalVisitado(data);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await LocalVisitadoService.getLocalVisitadoById(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await LocalVisitadoService.getAllLocalVisitados();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await LocalVisitadoService.deleteLocalVisitado(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;