// TODO: Revisar este arquivo - gerado por IA. Há coisas que podem estar misturadas. Verificar lógica, otimização e estilo.

const express = require("express");
const router = express.Router();
const EstabelecimentoService = require("../services/estabelecimento-service");

router.post("/", async (req, res) => {
  try {
    const estabelecimento = await EstabelecimentoService.criar(req.body);
    res.status(201).json(estabelecimento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const estabelecimento = await EstabelecimentoService.buscarPorId(
      req.params.id
    );
    res.status(200).json(estabelecimento);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const estabelecimentos = await EstabelecimentoService.listarTodos();
    res.status(200).json(estabelecimentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const estabelecimento = await EstabelecimentoService.atualizar(
      req.params.id,
      req.body
    );
    res.status(200).json(estabelecimento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await EstabelecimentoService.deletar(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
