// TODO: Revisar este arquivo - gerado por IA. Há coisas que podem estar misturadas. Verificar lógica, otimização e estilo.

const express = require("express");
const router = express.Router();
const CupomService = require("../services/cupom-service");

router.post("/", async (req, res) => {
  try {
    const cupom = await CupomService.criar(req.body);
    res.status(201).json(cupom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cupom = await CupomService.buscarPorId(req.params.id);
    res.status(200).json(cupom);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const cupons = await CupomService.listarTodos();
    res.status(200).json(cupons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const cupom = await CupomService.atualizar(req.params.id, req.body);
    res.status(200).json(cupom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await CupomService.deletar(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
