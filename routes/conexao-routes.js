// TODO: Revisar este arquivo - gerado por IA. Há coisas que podem estar misturadas. Verificar lógica, otimização e estilo.

const express = require("express");
const router = express.Router();
const ConexaoService = require("../services/conexao-service");

router.post("/", async (req, res) => {
  try {
    const conexao = await ConexaoService.criar(req.body);
    res.status(201).json(conexao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const conexao = await ConexaoService.buscarPorId(req.params.id);
    res.status(200).json(conexao);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const conexoes = await ConexaoService.listarTodos();
    res.status(200).json(conexoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const conexao = await ConexaoService.atualizar(req.params.id, req.body);
    res.status(200).json(conexao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await ConexaoService.deletar(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
