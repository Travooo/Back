const LocalVisitadoService = require("../services/LocalVisitadoService");

class LocalVisitadoController {
  static async create(req, res) {
    try {
      const data = await LocalVisitadoService.create(req.body);
      return res.status(201).json(data);
      // 201 Created: Indica que um novo recurso foi criado com sucesso, mas não há conteúdo a ser retornado na resposta.
    } catch (error) {
      return res.status(400).json({ error: error.message });
      // 400 Bad Request: Indica que a requisição do cliente é inválida.
      // Geralmente por falta de parâmetros obrigatórios ou formato incorreto.
    }
  }

  static async registrar_visita(req, res) {
    const { id_estabelecimento, id_usuario } = req.body;
    try {
      const visita = await LocalVisitadoService.registrar_visita(
        id_estabelecimento,
        id_usuario
      );
      res.status(201).json(visita);
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  }
  static async listar_visitas(req, res) {
    try {
      const { id_usuario } = req.params;
      const { error, visitas } = await LocalVisitadoService.listar_visitas(
        id_usuario
      );
      if (error) return res.status(400).json({ error: error.message });
      // 400 Bad Request: Indica que a requisição do cliente é inválida.
      // Geralmente por falta de parâmetros obrigatórios ou formato incorreto.
      if (!data) return res.status(404).json({ error: error.message });
      // 404 Not Found: Indica que o recurso solicitado não foi encontrado no servidor.
      // Pode ser um endpoint inexistente ou ID inválido.
      res.status(200).json(visitas);
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  }
}
module.exports = LocalVisitadoController;
