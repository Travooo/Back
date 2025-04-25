const UsuarioOrganizacaoService = require("../services/UsuarioOrganizacaoService");

class UsuarioOrganizacaoController {
  static async create(req, res) {
    try {
      const user = await UsuarioOrganizacaoService.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      console.error("Erro ao criar organização:");
      return res.status(400).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const data = await UsuarioOrganizacaoService.getById(req.params.id);
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Erro ao buscar organização #${req.params.id}:`);
      return res.status(404).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const data = await UsuarioOrganizacaoService.getAll();
      return res.status(200).json(data);
    } catch (error) {
      console.error("Erro ao buscar todas organizações:");
      return res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const data = await UsuarioOrganizacaoService.update(
        req.params.id,
        req.body
      );
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Erro ao atualizar organização #${req.params.id}:`);
      return res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await UsuarioOrganizacaoService.delete(req.params.id);
      return res.status(200).send();
    } catch (error) {
      console.error(`Erro ao deletar organização #${req.params.id}:`);
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UsuarioOrganizacaoController;
