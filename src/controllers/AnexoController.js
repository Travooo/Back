const AnexoService = require("../services/AnexoService");

class AnexoController {
  static async create(req, res) {
    try {
      const user = await AnexoService.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      console.error("Erro ao criar anexo:");
      return res.status(400).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const data = await AnexoService.getById(req.params.id);
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Erro ao buscar anexo #${req.params.id}:`);
      return res.status(404).json({ error: error.message });
    }
  }

  static async getByEmail(req, res) {
    try {
      const data = await AnexoService.getByEmail(req.params.email);
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Erro ao buscar anexo #${req.params.id}:`);
      return res.status(404).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const data = await AnexoService.getAll();
      return res.status(200).json(data);
    } catch (error) {
      console.error("Erro ao buscar todos anexos:");
      return res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const data = await AnexoService.update(req.params.id, req.body);
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Erro ao atualizar anexo #${req.params.id}:`);
      return res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await AnexoService.delete(req.params.id);
      return res.status(200).send();
    } catch (error) {
      console.error(`Erro ao deletar anexo #${req.params.id}:`);
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AnexoController;
