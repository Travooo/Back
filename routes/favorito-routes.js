const express = require('express');
const router = express.Router();
const FavoritoService = require('../services/favorito-service');

router.post('/', async (req, res) => {
    try {
        const favorito = await FavoritoService.criar(req.body);
        res.status(201).json(favorito);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const favorito = await FavoritoService.buscarPorId(req.params.id);
        res.status(200).json(favorito);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const favoritos = await FavoritoService.listarTodos();
        res.status(200).json(favoritos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await FavoritoService.deletar(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;