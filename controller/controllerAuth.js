
const authService = require('../services/authService');

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
    }
    const result = await authService.login(req.body);
    if (!result.success) {
      return res.status(401).json({ erro: result.mensagem });
    }
    return res.status(200).json({ token: result.token, usuario: result.usuario });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno no login.' });
  }
}

async function cadastrar(req, res) {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios.' });
    }
    const result = await authService.cadastrar(req.body);
    if (!result.success) {
      return res.status(400).json({ erro: result.mensagem });
    }
    return res.status(201).json({ usuario: result.usuario });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno no cadastro.' });
  }
}

module.exports = { login, cadastrar };

