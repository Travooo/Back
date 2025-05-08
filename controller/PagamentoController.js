const PagamentoService = require("../services/PagamentoService");

class PagamentoController {
  static async create(req, res) {
    try {
      const pagamento = await PagamentoService.create(req.body);
      return res.status(201).json(pagamento);
    } catch (error) {
      console.error("Erro ao criar pagamento:");
      return res.status(400).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const data = await PagamentoService.getById(req.params.id);
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Erro ao buscar pagamamento #${req.params.id}:`);
      return res.status(404).json({ error: error.message });
    }
  }

  static async getStatus(req, res) {
    try {
      const pagamento = await PagamentoService.getStatus(req.params.id);
      return res.status(200).json({ status: pagamento.status });
    } catch (error) {
      console.error(`Erro ao buscar status do pagamento #${req.params.id}:`);
      return res.status(404).json({ error: error.message });
    }
  }
  static async updateStatus(req, res) {
    try {
      console.log(`ID recebido na requisição: ${req.params.id}`);
      const resultado = await PagamentoService.updateStatus(
        req.params.id,
        req.body.status
      );
      return res.status(200).json(resultado);
    } catch (error) {
      console.error(
        `Erro ao atualizar status do pagamamento #${req.params.id}:`
      );
      return res.status(404).json({ erro: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const data = await PagamentoService.getAll();
      return res.status(200).json(data);
    } catch (error) {
      console.error("Erro ao buscar todos pagamentos:");
      return res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const data = await PagamentoService.update(req.params.id, req.body);
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Erro ao atualizar pagamento #${req.params.id}:`);
      return res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await PagamentoService.delete(req.params.id);
      return res.status(200).send();
    } catch (error) {
      console.error(`Erro ao deletar pagamento #${req.params.id}:`);
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = PagamentoController;
