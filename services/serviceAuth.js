const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsuarioService = require('../services/usuario_service');

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';


async function login(email, senha) {
  const usuario = await UsuarioService.getUsuarioByEmail(email);
  if (!usuario) {
    throw new Error("Nenhum usuário foi localizado com o email informado.");
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) {
    throw new Error("Senha incorreta");
  }

  const payload = {
    id: usuario.id,
    email: usuario.email
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

  return {
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    }
  };
}

async function cadastrar(usuario) {
  const existente = await UsuarioService.getUsuarioByEmail(usuario.email);
  if (existente) throw new Error("Email já cadastrado.");

  // Define valores padrão para campos obrigatórios não enviados
  if (usuario.admin === undefined) {
    usuario.admin = false;  // Valor padrão para admin
  }

  if (usuario.tipo_plano === undefined) {
    usuario.tipo_plano = 1;  // Valor padrão para tipo_plano
  }

   // Criptografa a senha ANTES de enviar para o service
  const hashedSenha = await bcrypt.hash(usuario.senha, 10);
  usuario.senha = hashedSenha;
  
  const novo = await UsuarioService.createUsuario(usuario)

  return { 
    usuario: { 
      id: novo.id, 
      nome_completo: novo.nome,
      email: novo.email,
    }
  };
}

module.exports = { login, cadastrar };
