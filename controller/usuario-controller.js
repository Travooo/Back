const UsuarioService = require("../services/usuario-service");

class UsuarioController {
  static async create(req, res) {
    try {
      const { data, error } = await UsuarioService.create(req.body);
      if (error) return res.status(400).json({ error: error.message });
      // 400 Bad Request: Indica que a requisição do cliente é inválida.
      // Geralmente por falta de parâmetros obrigatórios ou formato incorreto.
      return res.status(201).json(data);
      // 201 Created: Indica que um novo recurso foi criado com sucesso, mas não há conteúdo a ser retornado na resposta.
    } catch (error) {
      return res.status(500).json({ error: error.message });
      // 500 Internal Server Error: Indica que ocorreu um erro inesperado no servidor.
      // Geralmente ocorre quando há problemas no banco de dados ou no código.
    }
  }

  static async get_by_id(req, res) {
    try {
      const { data, error } = await UsuarioService.get_by_id(req.params.id);
      if (error) return res.status(400).json({ error: error.message });
      if (!data)
        return res.status(404).json({ error: "Usuário não encontrado." });
      // 404 Not Found: Indica que o recurso solicitado não foi encontrado no servidor.
      // Pode ser um endpoint inexistente ou ID inválido.
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async get_all(req, res) {
    try {
      const { data, error } = await UsuarioService.get_all();
      if (error) return res.status(400).json({ error: error.message });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { data, error } = await UsuarioService.update(
        req.params.id,
        req.body.updates
      );
      if (error) return res.status(400).json({ error: error.message });
      if (!data)
        return res
          .status(404)
          .json({ error: "Usuário não encontrado ou não atualizado." });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { error } = await UsuarioService.delete(req.params.id);
      if (error) return res.status(400).json({ error: error.message });
      return res.status(204).send();
      // 204 No Content: Indica que a requisição foi processada com sucesso, mas não há conteúdo a ser retornado na resposta.
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UsuarioController;
