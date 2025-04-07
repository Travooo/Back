const UsuarioService = require('../services/UsuarioService');

class UsuarioController {
  static async create(req, res) {
    try {
      const new_user_data = await UsuarioService.create(req.body);
      return res.status(201).json(new_user_data);
      // 201 Created: Indica que um novo recurso foi criado com sucesso, mas não há conteúdo a ser retornado na resposta.
    } catch (error) {
      console.error('Erro ao criar usuário:');
      return res.status(400).json({ error: error.message });
      // 400 Bad Request: Indica que a requisição do cliente é inválida.
      // Geralmente por falta de parâmetros obrigatórios ou formato incorreto.
    }
  }

  static async get_by_id(req, res) {
    try {
      const data = await UsuarioService.get_by_id(req.params.id);
      return res.status(200).json(data);
      // 200 OK: A requisição foi bem-sucedida.
    } catch (error) {
      return res.status(404).json({ error: error.message });
      // 404 Not Found: Indica que o recurso solicitado não foi encontrado no servidor.
      // Pode ser um endpoint inexistente ou ID inválido.
    }
  }

  static async get_all(req, res) {
    try {
      const data = await UsuarioService.get_all();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
      // 500 Internal Server Error: Indica que ocorreu um erro inesperado no servidor.
      // Geralmente ocorre quando há problemas no banco de dados ou no código.
    }
  }

  static async update(req, res) {
    try {
      const data = await UsuarioService.update(req.params.id, req.body);
      console.log('Retorno do service:', data);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await UsuarioService.delete(req.params.id);
      return res.status(204).send();
      // 204 No Content: Requisição processada com sucesso, mas não há conteúdo a ser retornado.
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UsuarioController;
