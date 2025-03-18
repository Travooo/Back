// TODO: Revisar este arquivo - gerado por IA. Há coisas que podem estar misturadas. Verificar lógica, otimização e estilo.

const express = require("express");
const router = express.Router();
const AvaliacaoService = require("../services/avaliacao-service");

router.post("/", async (req, res) => {
  try {
    const avaliacao = await AvaliacaoService.criar(req.body);
    res.status(201).json(avaliacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const avaliacao = await AvaliacaoService.buscarPorId(req.params.id);
    res.status(200).json(avaliacao);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const avaliacoes = await AvaliacaoService.listarTodos();
    res.status(200).json(avaliacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const avaliacao = await AvaliacaoService.atualizar(req.params.id, req.body);
    res.status(200).json(avaliacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await AvaliacaoService.deletar(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
