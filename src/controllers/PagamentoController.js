const PagamentoService = require("../services/PagamentoService");

class PagamentoController {
  static async create(req, res) {
    try {
      const new_payment = await PagamentoService.create(req.body);
      return res.status(201).json(new_payment);
      // 201 Created: Indica que um novo recurso foi criado com sucesso, mas não há conteúdo a ser retornado na resposta.
    } catch (error) {
      console.error("Erro ao criar pagamento:");
      return res.status(400).json({ error: error.message });
      // 400 Bad Request: Indica que a requisição do cliente é inválida.
      // Geralmente por falta de parâmetros obrigatórios ou formato incorreto.
    }
  }

  static async get_by_id(req, res) {
    try {
      const data = await PagamentoService.get_by_id(req.params.id);
      return res.status(200).json(data);
      // 200 OK: A requisição foi bem-sucedida.
    } catch (error) {
      return res.status(404).json({ error: error.message });
      // 404 Not Found: Indica que o recurso solicitado não foi encontrado no servidor.
      // Pode ser um endpoint inexistente ou ID inválido.
    }
  }

  static async get_status(req, res) {
    try {
      const pagamento = await PagamentoService.get_status(req.params.id);
      return res.status(200).json({ status: pagamento.status });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  static async update_status(req, res) {
    try {
      const { status } = req.body;
      const updated = await PagamentoService.update_status(
        req.params.id,
        status
      );
      return res.status(200).json(updated);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async get_all(req, res) {
    try {
      const data = await PagamentoService.get_all();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
      // 500 Internal Server Error: Indica que ocorreu um erro inesperado no servidor.
      // Geralmente ocorre quando há problemas no banco de dados ou no código.
    }
  }

  static async update(req, res) {
    try {
      const data = await PagamentoService.update(
        req.params.id,
        req.body.updates
      );
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await PagamentoService.delete(req.params.id);
      return res.status(204).send();
      // 204 No Content: Requisição processada com sucesso, mas não há conteúdo a ser retornado.
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = PagamentoController;
