// TODO: Revisar este arquivo - gerado por IA. Há coisas que podem estar misturadas. Verificar lógica, otimização e estilo.

const UsuarioOrganizacaoService = require("../services/usuarioOrganizacao-service");

class UsuarioOrganizacaoController {
  static async criar_usuario_organizacao(req, res) {
    try {
      const data = req.body;
      const result = await UsuarioOrganizacaoService.createUsuarioOrganizacao(
        data
      );
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  static async get_usuario_organizacao_por_id(req, res) {
    try {
      const { id } = req.params;
      const result = await UsuarioOrganizacaoService.getUsuarioOrganizacaoById(
        id
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  static async obter_todos_usuarios_organizacao(req, res) {
    try {
      const result = await UsuarioOrganizacaoService.getAllUsuarioOrganizacao();
      res.json(result);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  static async atualizar_usuario_organizacao(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const result = await UsuarioOrganizacaoService.updateUsuarioOrganizacao(
        id,
        updates
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  static async deletar_usuario_organizacao(req, res) {
    try {
      const { id } = req.params;
      const result = await UsuarioOrganizacaoService.deleteUsuarioOrganizacao(
        id
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = UsuarioOrganizacaoController;
