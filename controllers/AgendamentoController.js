const AgendamentoService = require('../services/AgendamentoService');

class AgendamentoController {
  static async create(req, res) {
    try {
      const new_agendamento = await AgendamentoService.create(req.body);
      return res.status(201).json(new_agendamento);
    } catch (error) {
      console.error('Erro ao criar agendamento:');
      console.error({ error: error.message });
      return res.status(400).json({ error: error.message });
    }
  }

  static async get_by_id(req, res) {
    try {
      const data = await AgendamentoService.get_by_id(req.params.id);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  static async get_all(req, res) {
    try {
      const data = await AgendamentoService.get_all();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const data = await AgendamentoService.update(req.params.id, req.body);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await AgendamentoService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AgendamentoController;
