
const serviceAuth = require('../services/serviceAuth');

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
    }
    const result = await serviceAuth.login(req.body);
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
    const { nome_completo, nome_usuario, data_nascimento, email, senha, tipo } = req.body;    
    if (!nome_completo || !nome_usuario || !data_nascimento || !email || !senha || !tipo) {
      return res.status(400).json({ erro: 'Dados obrigatórios não informados.' });
    }
    const usuario = await serviceAuth.cadastrar(req.body);
    return res.status(201).json({ usuario });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro interno no cadastro.' });
  }
}

module.exports = { login, cadastrar };

