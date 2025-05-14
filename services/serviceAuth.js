const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsuarioService = require('../services/usuario_service');
const UsuarioOrganizacaoService = require('../services/usuarioOrganizacao_service');


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

  // Criptografa a senha ANTES de enviar para o service
  const hashedSenha = await bcrypt.hash(usuario.senha, 10);
  usuario.senha = hashedSenha;

  const [dia, mes, ano] = usuario.data_nascimento.split('/');
  const dataConvertidaIso = `${ano}-${mes}-${dia}`;

  //let novoUsuario;

  //if (usuario.tipo === "usuario") {
    const novoUsuario = await UsuarioService.createUsuario({
      nome_completo: usuario.nome_completo,
      nome_usuario: usuario.nome_usuario,
      data_nascimento: dataConvertidaIso,
      email: usuario.email,
      senha: usuario.senha,
      admin: false,
      tipo_plano: 1,
    });
  /*} else {
    novoUsuario = await UsuarioOrganizacaoService.createUsuarioOrg({
      nome_completo: usuario.nome_completo,
      nome_usuario: usuario.nome_usuario,
      data_nascimento: usuario.data_nascimento,
      email: usuario.email,
      senha: usuario.senha,
      admin: false,
      tipo_plano: 1,
    });
  }*/
  const usuarioCriado = Array.isArray(novoUsuario) ? novoUsuario[0] : novoUsuario;
  if (!usuarioCriado || !usuarioCriado.id) {
    throw new Error("Falha ao criar usuário.");
  }

  return {
      id: usuarioCriado.id, 
      nome_completo: usuarioCriado.nome_completo,
      email: usuarioCriado.email,
      tipo: usuario.tipo
  };
}

module.exports = { login, cadastrar };
