const validator = require('validator');
const { tryParseBoolean, tryParseInt, tryParseDate, tryParseString, tryParseFloat } = require('../utils/parsers');

function validateId(id) {
  const parsed = tryParseInt(id);
  if (parsed === null || parsed <= 0) {
    throw new Error("Atributo 'id' inválido. Deve ser um número inteiro positivo.");
  }
  return parsed;
}

function validateEmail(email) {
  const parsed = tryParseString(email.toLowerCase());
  if (!parsed) throw new Error("Atributo 'email' ausente ou indefinido.");
  if (!validator.isEmail(parsed)) {
    throw new Error("Atributo 'email' inválido.");
  }
  return parsed;
}

function validateNomeUsuario(nome) {
  const parsed = tryParseString(nome);
  if (!parsed) throw new Error("Atributo 'nome_usuario' ausente ou indefinido.");
  // Aceita letras Unicode, números e underline (sem espaços ou símbolos especiais)
  if (!/^[\w]{3,}$/u.test(parsed)) {
    throw new Error("Atributo 'nome_usuario' inválido. Use apenas letras, números e underline (mínimo 3 caracteres).");
  }
  return parsed;
}

function validateNomeCompleto(nome) {
  const parsed = tryParseString(nome);
  if (!parsed) throw new Error("Atributo 'nome_completo' ausente ou vazio.");
  // Aceita letras Unicode, números e underline (sem espaços ou símbolos especiais)
  if (!/^[\p{L} ]+$/u.test(parsed)) {
    throw new Error("Atributo 'nome_completo' inválido. Use apenas letras e espaços.");
  }
  return parsed;
}

function validateFotoPerfilBase64(base64) {
  // Validar/gerar buffer imagem 'foto_perfil':
  // Considerando que o front envie a imagem convertida para uma string base64: { "foto_perfil": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."}
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
  const trimmed = tryParseString(senha);
  if (!trimmed) throw new Error("Atributo 'senha' ausente ou indefinido.");
  const caracteresInvalidos = /[ "'\\]/; //Ex: Espaço, aspas duplas, aspas simples, barra invertida
  if (caracteresInvalidos.test(trimmed)) {
    throw new Error("Atributo 'senha' inválido. Contém caracteres não permitidos.");
  }
  if (trimmed.length < 6) {
    throw new Error("Atributo 'senha' inválido. Deve conter ao menos 6 caracteres.");
  }
  return trimmed;
}

function validateSobre(sobre) {
  const trimmed = tryParseString(sobre);
  if (!trimmed) return null;
  if (trimmed && trimmed.length > 300) {
    throw new Error("Atributo 'sobre' excede o limite de 300 caracteres.");
  }
  return trimmed;
}

function validateDetalhes(detalhes) {
  const trimmed = tryParseString(detalhes);
  if (!trimmed) return null;
  if (trimmed && trimmed.length > 1000) {
    throw new Error("Atributo 'detalhes' excede o limite de 1000 caracteres.");
  }
  return trimmed;
}

function validateDate(date, atributo) {
  if (!date || typeof date !== 'string') {
    throw new Error(`Atributo '${atributo}' ausente, indefinido ou não é uma string.`);
  }
  const parsed = tryParseDate(date);
  if (parsed === null) {
    throw new Error(`Atributo '${atributo}' inválido. Formato de data inválido ou não reconhecido.`);
  }
  return parsed;
}

function validateAdmin(admin) {
  const parsed = tryParseBoolean(admin);
  if (parsed === null) throw new Error("Atributo 'admin' inválido. Deve ser verdadeiro (true) ou falso (false).");
  return parsed;
}

function validatePlano(admin) {
  const planosAtivos = [1, 2, 3];
  const parsed = tryParseInt(admin);
  if (parsed === null) throw new Error("Atributo 'plano' ausente, indefinido, ou não é um inteiro.");
  if (!planosAtivos.includes(parsed)) throw new Error("Atributo 'plano' inválido.");
  return parsed;
}

function normalizeToISOString(date) {
  const d = new Date(date);
  return d.toISOString();
}

module.exports = { validateEmail, validateSenha, validateNomeUsuario, validateNomeCompleto, validateDetalhes, validateSobre, validateFotoPerfilBase64, validateAdmin, validateId, validateDate, validatePlano };
