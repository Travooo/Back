// TODO: Revisar este arquivo - gerado por IA. Há coisas que podem estar misturadas. Verificar lógica, otimização e estilo.

const express = require("express");
const router = express.Router();
const AgendamentoService = require("../services/agendamento-service");

router.post("/", async (req, res) => {
  try {
    const agendamento = await AgendamentoService.criar(req.body);
    res.status(201).json(agendamento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const agendamento = await AgendamentoService.buscarPorId(req.params.id);
    res.status(200).json(agendamento);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const agendamentos = await AgendamentoService.listarTodos();
    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const agendamento = await AgendamentoService.atualizar(
      req.params.id,
      req.body
    );
    res.status(200).json(agendamento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await AgendamentoService.deletar(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
