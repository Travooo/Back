const express = require("express");
const UsuarioService = require("../services/usuario-service");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const result = await UsuarioService.create(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await UsuarioService.get_all();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UsuarioService.get_by_id(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const result = await UsuarioService.update(id, updates);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UsuarioService.delete(id);
    res.status(204).json(send);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;