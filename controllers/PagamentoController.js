const PagamentoService = require("../services/pagamento-service");

class PagamentoController {
  static async create(req, res) {
    try {
      const pagamento = await PagamentoService.create(req.body);
      return res.status(201).json(pagamento);
      // 201 Created: Indica que um novo recurso foi criado com sucesso, mas não há conteúdo a ser retornado na resposta.
    } catch (error) {
      return res.status(400).json({ error: error.message });
      // 400 Bad Request: Indica que a requisição do cliente é inválida.
      // Geralmente por falta de parâmetros obrigatórios ou formato incorreto.
    }
  }

  static async get_by_id(req, res) {
    try {
      const pagamento = await PagamentoService.get_by_id(req.params.id);
      return res.status(200).json(pagamento);
      // 200 OK: Indica que a requisição foi bem sucedida e o servidor retornou a resposta esperada.
    } catch (error) {
      return res.status(404).json({ error: error.message });
      // 404 Not Found: Indica que o recurso solicitado não foi encontrado no servidor.
      // Pode ser um endpoint inexistente ou ID inválido.
    }
  }

  static async get_all(res) {
    try {
      const pagamentos = await PagamentoService.get_all();
      return res.status(200).json(pagamentos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
      // 500 Internal Server Error: Indica um erro inesperado no servidor.
      // Geralmente ocorre quando há um problema interno no código.
    }
  }

  static async get_status(req, res) {
    try {
      const status = await PagamentoService.get_status(req.params.id);
      return res.status(200).json(status);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  static async update_status(req, res) {
    try {
      const { status } = req.body;
      if (!status) return res.status(400).json({ error: error.message });
      const pagamento = await PagamentoService.update_status(
        req.params.id,
        status
      );
      return res.status(200).json(pagamento);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await PagamentoService.delete(req.params.id);
      return res.status(204).send();
      // 204 No Content: Indica que a requisição foi processada com sucesso, mas não há conteúdo a ser retornado na resposta.
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = PagamentoController;
