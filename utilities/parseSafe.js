const validator = require('validator');

function validateEmail(email) {
  if (!email || typeof email !== 'string' || email.trim() === '') {
    throw new Error("Atributo 'email' ausente ou indefinido.");
  }
  const trimmed = email.trim().toLowerCase();
  if (!validator.isEmail(trimmed)) {
    throw new Error("Atributo 'email' inválido.");
  }
  return trimmed;
}

function validateNomeUsuario(nome) {
  if (!nome || typeof nome !== 'string' || nome.trim() === '') {
    throw new Error("Atributo 'nome_usuario' ausente ou vazio.");
  }
  const trimmed = nome.trim();
  // Aceita letras Unicode, números e underline (sem espaços ou símbolos especiais)
  if (!/^[\w]{3,}$/u.test(trimmed)) {
    throw new Error("Atributo 'nome_usuario' inválido. Use apenas letras, números e underline (mínimo 3 caracteres).");
  }
  return trimmed;
}

function validateNomeCompleto(nome) {
  if (!nome || typeof nome !== 'string' || nome.trim() === '') {
    throw new Error("Atributo 'nome_completo' ausente ou vazio.");
  }
  const parsed = nome.trim();
  // Aceita letras Unicode, números e underline (sem espaços ou símbolos especiais)
  if (!/^[\p{L} ]+$/u.test(parsed)) {
    throw new Error("Atributo 'nome_usuario' inválido. Use apenas letras, números e underline.");
  }
  return parsed;
}

// Validar/gerar buffer imagem 'foto_perfil':
// Considerando que o front envie a imagem convertida para uma string base64: { "foto_perfil": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."}
function validateFotoPerfilBase64(base64) {
  if (!base64 || typeof base64 !== 'string') return null;
  const matches = base64.match(/^data:(image\/[a-z]+);base64,(.+)$/);
  if (!matches) {
    throw new Error("Atributo 'foto_perfil' inválido. Formato base64 esperado.");
  }
  const buffer = Buffer.from(matches[2], 'base64'); // Matches[2] é a parte com os dados64 sem o prefixo "data:image/".
  if (buffer.length > 5 * 1024 * 1024) {
    throw new Error("Atributo 'foto_perfil' excede 5MB.");
  }
  return buffer;
}

function validateSenha(senha) {
  if (!senha || typeof senha !== 'string' || senha.trim() == '') {
    throw new Error("Atributo 'senha' ausente ou indefinido.");
  }
  const trimmed = senha.trim();
  if (trimmed.length < 6) {
    throw new Error("Atributo 'senha' inválido. Deve conter ao menos 6 caracteres.");
  }
  const caracteresInvalidos = /[ "'\\]/; //Ex: Espaço, aspas duplas, aspas simples, barra invertida
  if (caracteresInvalidos.test(trimmed)) {
    throw new Error("Atributo 'senha' inválido. Contém caracteres não permitidos.");
  }
  return trimmed;
}

function validateSobre(sobre) {
  if (sobre === null || sobre === undefined) return null;
  if (typeof sobre !== 'string') {
    throw new Error("Atributo 'sobre' deve ser uma string.");
  }
  const trimmed = sobre.trim();
  if (trimmed.length > 160) {
    throw new Error("Atributo 'sobre' excede o limite de 160 caracteres.");
  }
  return trimmed === '' ? null : trimmed;
}

function tryParseString(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}

function tryParseBoolean(value) {
  if (typeof value === 'string') {
    const val = value.toLowerCase().trim();
    if (val === 'true') return true;
    if (val === 'false') return false;
  }
  return null;
}

function tryParseDate(value) {
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}

function tryParseFloat(value) {
  const n = parseFloat(value);
  return isNaN(n) ? null : n;
}

function tryParseInt(value) {
  const n = parseInt(value, 10);
  return isNaN(n) ? null : n;
}

module.exports = {
  validateEmail,
  validateSenha,
  validateNomeUsuario,
  validateNomeCompleto,
  validateSobre,
  validateFotoPerfilBase64,
  tryParseBoolean,
  tryParseInt,
  tryParseDate,
  tryParseFloat,
  tryParseString,
};
