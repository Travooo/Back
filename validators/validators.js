// Last modifications: included "entidade_tipo: ["usuarios", "servicos"]" in validateOption;

const supabase = require("../config/db");

function validateNumber(value, atributo) {
// *Com UUID, este método creceria ou outro específico para IDs nasceria.*

  if (!value) {
    throw new Error(
      `Atributo '${atributo}' é obrigatório e não pode ser vazio.`
    );
  }
  const isId = atributo?.toLowerCase().includes("id");
  const parsed = isId ? parseInt(value, 10) : parseFloat(value);
  if (isNaN(parsed))
    throw new Error(
      `Atributo '${atributo}' inválido. Valor numérico esperado.`
    );
  const validFloat = /^\d+(\.\d{1,2})?$/; // Define máximo de duas casas decimais
  if (parsed <= 0 || (!isId && !validFloat.test(String(value))))
    throw new Error(
      `Atributo '${atributo}' inválido. ` +
        (isId
          ? "Deve ser um número inteiro positivo."
          : "Deve ser um valor positivo com até duas casas decimais.")
    );
  return parsed;
}

function validateString(
  value,
  {
    atributo,
    required = false,
    formato = null,
    min = null,
    max = null,
    erro_formato = null,
  }
) {
  if (!atributo)
    throw new Error(`Obrigatório informar nome do atributo em validateString.`);
  if (typeof value !== "string") {
    if (required)
      throw new Error(
        `Atributo obrigatório '${atributo}' ausente, vazio ou indefinido.`
      );
    return null;
  }
  const parsed = value.trim();
  if (!parsed) {
    if (required)
      throw new Error(
        `Atributo '${atributo}' obrigatório ausente, vazio ou indefinido.`
      );
    return null;
  }
  if (min && parsed.length < min)
    throw new Error(
      `Atributo '${atributo}' inválido. Deve conter ao menos ${min} caracteres.`
    );
  if (max && parsed.length > max)
    throw new Error(
      `Atributo '${atributo}' excede o limite de ${max} caracteres.`
    );
  if (formato) {
    const isValid =
      typeof formato === "function" ? formato(parsed) : formato.test(parsed);
    if (!isValid)
      throw new Error(
        `Atributo '${atributo}' inválido.` +
          (erro_formato ? " " + erro_formato : "")
      );
  }
  return parsed;
}

// Implementar verificação do atributo para definir se o formato deve ser data ou data/hora
function validateDate(date, atributo) {
  if (!date || typeof date !== "string") {
    throw new Error(
      `Atributo '${atributo}' ausente, indefinido ou não é uma string.`
    );
  }
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) {
    throw new Error(
      `Atributo '${atributo}' inválido. Formato de data inválido ou não reconhecido.`
    );
  }
  // Verificação específica para 'data_nascimento'
  if (atributo === "data_nascimento") {
    const dataLimite = new Date(
      new Date().setFullYear(new Date().getFullYear() - 5)
    );
    if (parsed > dataLimite) {
      throw new Error("Data de nascimento deve ser de ao menos 5 anos atrás.");
    }
  }
  // Verificação específica para 'data_visita'
  if (atributo === "data_visita") {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Zera horas para comparar apenas data
    if (parsed > hoje) {
      throw new Error(
        "A data da visita deve ser anterior ou igual à data atual."
      );
    }
  }
  // Verificação específica para 'horario'
  if (atributo === "horario") {
    if (!date.includes("T")) {
      throw new Error(
        "O horário deve incluir data e hora, como '2025-04-26T15:30'."
      );
    }
    const offsetMs = parsed.getTimezoneOffset() * 60000;
    const localDate = new Date(parsed.getTime() - offsetMs);
    return localDate.toISOString().slice(0, 16);
  }
  return parsed.toISOString();
}

function validateOption(value, atributo) {
  const listas = {
    admin: [true, false],
    tipo_plano: [1, 2, 3],
    metodo_pagamento: ["credito", "debito", "pix", "boleto"],
    status: ["pendente", "pago", "cancelado", "estornado"],
    tipo_anexo: ["pendente", "pago", "cancelado", "estornado"],
    entidade_tipo: ["usuarios", "servicos"],
  };
  if (!(atributo in listas))
    throw new Error(`Atributo '${atributo}' não reconhecido.`);
  const permitido = listas[atributo];
  if (!permitido.includes(value)) {
    throw new Error(`Atributo '${atributo}' inválido.`);
  }
  return value;
}

function validateAnexo(
  base64,
  { atributo, tiposPermitidos = [], tamanhoMaxMB = 50 }
) {
  if (!atributo)
    throw new Error(`Obrigatório informar nome do atributo em validateAnexo.`);
  if (!base64 || typeof base64 !== "string") return null;
  const matches = base64.match(/^data:([\w\/\-\+\.]+);base64,(.+)$/);
  if (!matches) {
    throw new Error(
      `Atributo '${atributo}' inválido. Formato base64 esperado.`
    );
  }
  const mimeType = matches[1];
  const base64Data = matches[2];
  // Verifica se o tipo MIME é permitido
  if (tiposPermitidos.length > 0 && !tiposPermitidos.includes(mimeType)) {
    throw new Error(
      `Atributo '${atributo}' inválido. Tipo de arquivo '${mimeType}' não permitido.`
    );
  }
  const buffer = Buffer.from(base64Data, "base64");
  const maxBytes = tamanhoMaxMB * 1024 * 1024;
  if (buffer.length > maxBytes) {
    throw new Error(
      `Atributo '${atributo}' excede o limite de ${tamanhoMaxMB}MB.`
    );
  }
  return buffer;
}

async function getIfExists({ tabela, coluna = "id", value, select = "*" }) {
  const { data, error } = await supabase
    .from(tabela)
    .select(select)
    .eq(coluna, value)
    .maybeSingle();
  if (error) throw new Error(`Erro ao verificar ${tabela}: ${error.message}`);
  if (!data)
    throw new Error(
      `${tabela.charAt(0).toUpperCase() + tabela.slice(1)} não encontrado.`
    );
  return data;
}

function cleanObject(obj = {}) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) =>
      typeof v === "string" ? v.trim() !== "" : v !== undefined && v !== null
    )
  );
}

module.exports = {
  validateString,
  validateNumber,
  validateDate,
  validateOption,
  validateAnexo,
  getIfExists,
  cleanObject,
};
