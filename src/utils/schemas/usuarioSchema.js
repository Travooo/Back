const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexSenha = /^[a-zA-Z0-9!@#\$%\^&\*\)\(+=._-]+$/;
const regexNomeUsuario = /^[a-zA-Z0-9_]+$/;
const regexNomeCompleto = /^[A-Za-zÀ-ÿ\s]+$/;

const usuarioSchema = {
  email: {
    tipo: 'string',
    required: true,
    formato: regexEmail,
    erro: 'Formato de email inválido.',
  },
  senha: {
    tipo: 'string',
    required: true,
    min: 6,
    max: 20,
    formato: regexSenha,
    erro: 'A senha deve conter apenas letras, números ou caracteres especiais permitidos.',
  },
  nome_usuario: {
    tipo: 'string',
    required: true,
    min: 4,
    max: 20,
    formato: regexNomeUsuario,
    erro: 'O nome de usuário pode conter apenas letras, números ou underline.',
  },
  nome_completo: {
    tipo: 'string',
    required: true,
    min: 3,
    max: 60,
    formato: regexNomeCompleto,
    erro: 'O nome completo deve conter apenas letras e espaços.',
  },
  sobre: {
    tipo: 'string',
    min: 10,
    max: 300,
  },
  admin: {
    tipo: 'option',
  },
  tipo_plano: {
    tipo: 'option',
  },
  data_nascimento: {
    tipo: 'date',
  },
  foto_perfil: {
    tipo: 'foto',
  },
};

module.exports = usuarioSchema;
