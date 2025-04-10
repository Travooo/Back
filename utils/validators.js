const { supabase } = require('../config/supabaseClient');

function validateString(value, { atributo, required = false, formato = null, min = null, max = null, erro = null }) {
  if (!atributo) throw new Error(`Obrigatório informar nome do atributo em validateString.`);
  if (typeof value !== 'string') {
    if (required) throw new Error(`Atributo obrigatório '${atributo}' ausente, vazio ou indefinido.`);
    return null;
  }
  const parsed = value.trim();
  if (required && !parsed) throw new Error(`Atributo '${atributo}' obrigatório ausente, vazio ou indefinido.`);
  if (parsed === '') return null;
  if (min && parsed.length < min) throw new Error(`Atributo '${atributo}' inválido. Deve conter ao menos ${min} caracteres.`);
  if (max && parsed.length > max) throw new Error(`Atributo '${atributo}' excede o limite de ${max} caracteres.`);
  if (formato) {
    const isValid = typeof formato === 'function' ? formato(parsed) : formato.test(parsed);
    if (!isValid) throw new Error(`Atributo '${atributo}' inválido.` + (erro ? ' ' + erro : ''));
  }
  return parsed;
}

function validateNumber(value, atributo) {
  const isId = atributo?.toLowerCase().includes('id');
  const parsed = isId ? parseInt(value, 10) : parseFloat(value);
  if (isNaN(parsed)) throw new Error(`Atributo '${atributo}' inválido. Valor numérico esperado.`);
  const validFloat = /^\d+(\.\d{1,2})?$/; // Define máximo de duas casas decimais
  if (parsed <= 0 || (!isId && !validFloat.test(String(value)))) throw new Error(`Atributo '${atributo}' inválido. ` + (isId ? 'Deve ser um número inteiro positivo.' : 'Deve ser um valor positivo com até duas casas decimais.'));
  return parsed;
}

function validateDate(date, atributo) {
  if (!date || typeof date !== 'string') {
    throw new Error(`Atributo '${atributo}' ausente, indefinido ou não é uma string.`);
  }
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) {
    throw new Error(`Atributo '${atributo}' inválido. Formato de data inválido ou não reconhecido.`);
  }
  return parsed.toISOString();
}

function validateOption(value, atributo) {
  const listas = {
    admin: [true, false],
    tipo_plano: [1, 2, 3],
    metodo_pagamento: ['credito', 'debito', 'pix', 'boleto'],
    status: ['pendente', 'pago', 'cancelado', 'estornado'],
  };
  if (!(atributo in listas)) throw new Error(`Atributo '${atributo}' não reconhecido.`);
  const permitido = listas[atributo];
  if (!permitido.includes(value)) {
    throw new Error(`Atributo '${atributo}' inválido.`);
  }
  return value;
}

function validateFoto(base64) {
  // Pode ser generalizado futuramente como validateAnexo com tipo e atributo.
  if (!base64 || typeof base64 !== 'string') return null;
  const matches = base64.match(/^data:(image\/[a-z]+);base64,(.+)$/);
  if (!matches) throw new Error("Atributo 'foto_perfil' inválido. Formato base64 esperado.");
  const buffer = Buffer.from(matches[2], 'base64'); // Matches[2] é a parte da string base64 com os dados, excluindo o prefixo "data:image/"
  if (buffer.length > 5 * 1024 * 1024) throw new Error("Atributo 'foto_perfil' excede 5MB.");
  return buffer;
}

async function getIfExists({ tabela, coluna = 'id', value, select = '*' }) {
  const { data, error } = await supabase.from(tabela).select(select).eq(coluna, value).maybeSingle();
  if (error) throw new Error(`Erro ao verificar ${tabela}: ${error.message}`);
  if (!data) throw new Error(`${tabela.charAt(0).toUpperCase() + tabela.slice(1)} não encontrado.`);
  return data;
}

module.exports = { validateString, validateNumber, validateDate, validateOption, validateFoto, getIfExists };
