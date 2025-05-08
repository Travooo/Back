const ServicoService = require("../services/ServicoService");

class ServicoController {
  static async create(req, res) {
    try {
      const servico = await ServicoService.create(req.body);
      return res.status(201).json(servico);
    } catch (error) {
      console.error("Erro ao criar serviço:");
      return res.status(400).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const data = await ServicoService.getById(req.params.id);
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Erro ao buscar serviço #${req.params.id}:`);
      return res.status(404).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const data = await ServicoService.getAll();
      return res.status(200).json(data);
    } catch (error) {
      console.error("Erro ao buscar todos serviços:");
      return res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const data = await ServicoService.update(req.params.id, req.body);
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Erro ao atualizar serviço #${req.params.id}:`);
      return res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await ServicoService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      console.error(`Erro ao deletar serviço #${req.params.id}:`);
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ServicoController;
