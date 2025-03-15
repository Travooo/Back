const express = require('express');
const router = express.Router();
const AnexoService = require('../services/anexo-service');

router.post('/', async (req, res) => {
    const { estabelecimento, arquivo, nome_arquivo, tipo_arquivo } = req.body;
    const { data, error } = await AnexoService.criarAnexo(estabelecimento, arquivo, nome_arquivo, tipo_arquivo);
    if (error) return res.status(400).json({ error });
    res.status(201).json(data);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await AnexoService.buscarAnexoPorId(id);
    if (error) return res.status(404).json({ error });
    res.json(data);
});

router.get('/', async (req, res) => {
    const { data, error } = await AnexoService.listarAnexos();
    if (error) return res.status(400).json({ error });
    res.json(data);
});

module.exports = router;