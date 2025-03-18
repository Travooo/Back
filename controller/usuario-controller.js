const UsuarioService = require("../services/usuario-service");

class UsuarioController {
  static async create(req, res) {
    const {
      admin,
      email,
      senha,
      nome_usuario,
      nome_completo,
      sobre,
      foto_perfil,
      data_nascimento,
    } = req.body;

    if (!email || !senha || !nome_usuario || !nome_completo) {
      //*Campos obrigatórios devem constar nessa verificação */
      return res
        .status(400)
        .json({ error: "Campos obrigatórios ausentes ou inválidos." });
    }

    const usuario = {
      admin,
      email,
      senha,
      nome_usuario,
      nome_completo,
      sobre,
      foto_perfil,
      data_nascimento,
    };

    const { data, error } = await UsuarioService.create(usuario);
    if (error) return res.status(400).json({ error: error.message });

    return res.status(201).json(data);
  }

  static async get_by_id(req, res) {
    const { id } = req.params;
    const { data, error } = await UsuarioService.get_by_id(id);

    if (error) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.status(200).json(data);
  }

  static async get_all(req, res) {
    const { data, error } = await UsuarioService.get_all();
    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json(data);
  }

  static async update(req, res) {
    const { id } = req.params;
    const updates = req.body;
    try {
      const data = await UsuarioService.update(id, updates);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    const { error } = await UsuarioService.delete(id);
    if (error) return res.status(400).json({ error: error.message });
    return res.status(204).send();
  }
}

module.exports = UsuarioController;
