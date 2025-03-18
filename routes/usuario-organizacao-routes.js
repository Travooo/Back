// TODO: Revisar este arquivo - gerado por IA. Há coisas que podem estar misturadas. Verificar lógica, otimização e estilo.

const express = require("express");
const UsuarioOrganizacaoService = require("../services/usuario-organizacao-service");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const result = await UsuarioOrganizacaoService.createUsuarioOrganizacao(
      data
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UsuarioOrganizacaoService.getUsuarioOrganizacaoById(
      id
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await UsuarioOrganizacaoService.getAllUsuarioOrganizacao();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const result = await UsuarioOrganizacaoService.updateUsuarioOrganizacao(
      id,
      updates
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UsuarioOrganizacaoService.deleteUsuarioOrganizacao(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
