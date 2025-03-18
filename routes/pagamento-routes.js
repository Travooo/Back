// TODO: Revisar este arquivo - gerado por IA. Há coisas que podem estar misturadas. Verificar lógica, otimização e estilo.

const express = require("express");
const PagamentoService = require("../services/pagamento-service");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const result = await PagamentoService.createPagamento(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await PagamentoService.getPagamentoById(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await PagamentoService.getAllPagamentos();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await PagamentoService.deletePagamento(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
