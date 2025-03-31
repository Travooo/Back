const OrganizacaoService = require("../services/OrganizacaoService");

class OrganizacaoController {
  static async create(req, res) {
    try {
      const data = req.body;
      const result = await OrganizacaoService.create(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  static async get_by_id(req, res) {
    try {
      const { id } = req.params;
      const result = await OrganizacaoService.get_by_id(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  static async get_all(req, res) {
    try {
      const result = await OrganizacaoService.get_all();
      res.json(result);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const result = await OrganizacaoService.update(id, updates);
      res.json(result);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await OrganizacaoService.delete(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = OrganizacaoController;
