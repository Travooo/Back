// TODO: Revisar este arquivo - gerado por IA. Há coisas que podem estar misturadas. Verificar lógica, otimização e estilo.

const express = require("express");
const router = express.Router();
const EventoService = require("../services/evento-service");

router.post("/", async (req, res) => {
  try {
    const evento = await EventoService.criar(req.body);
    res.status(201).json(evento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const evento = await EventoService.buscarPorId(req.params.id);
    res.status(200).json(evento);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const eventos = await EventoService.listarTodos();
    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const evento = await EventoService.atualizar(req.params.id, req.body);
    res.status(200).json(evento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await EventoService.deletar(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
