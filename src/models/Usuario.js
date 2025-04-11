const { validateString, validateFoto, validateDate, validateOption } = require('../utils/validators');

class Usuario {
  constructor(email, senha, nome_usuario, nome_completo, foto_perfil = null, sobre = null, data_nascimento, admin, tipo_plano) {
    this.email = validateString(email, {
      atributo: 'email',
      required: true,
      formato: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      erro: 'Formato de email inválido.',
    });
    this.senha = validateString(senha, {
      atributo: 'senha',
      required: true,
      min: 6,
      max: 20,
      formato: /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/, // Permite letras, números e alguns caracteres especiais
      erro: 'A senha deve conter apenas letras, números ou caracteres especiais permitidos.',
    });
    this.nome_usuario = validateString(nome_usuario, {
      atributo: 'nome_usuario',
      required: true,
      min: 4,
      max: 20,
      formato: /^[a-zA-Z0-9_]+$/, // Permite letras, números e underline
      erro: 'O nome de usuário pode conter apenas letras, números ou underline (sem espaços ou símbolos especiais).',
    });
    this.nome_completo = validateString(nome_completo, {
      atributo: 'nome_completo',
      required: true,
      min: 3,
      max: 60,
      formato: /^[A-Za-zÀ-ÿ\s]+$/, // Permite letras com acentos e espaços
      erro: 'O nome completo deve conter apenas letras e espaços (sem números ou símbolos).',
    });
    this.foto_perfil = validateFoto(foto_perfil);
    this.sobre = validateString(nome_completo, {
      atributo: 'nome_completo',
      min: 10,
      max: 300,
    });
    this.data_nascimento = validateDate(data_nascimento, 'data_nascimento');
    this.admin = validateOption(admin, 'admin');
    this.tipo_plano = validateOption(tipo_plano, 'tipo_plano');
  }
}

module.exports = Usuario;
