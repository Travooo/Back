class ModeloBase {
  static #schema = {}; // Cada subclasse deve sobrescrever com seu próprio schema
  constructor(data = {}) {
    const schema = this.constructor.getSchema();
    for (const key in schema) {
      const rule = schema[key];
      const valor = data[key];
      if (valor === undefined || valor === null || valor === "") {
        if (rule.required) {
          throw new Error(`Atributo obrigatório '${key}' ausente.`);
        }
        this[key] = null;
      } else {
        this[key] = this.constructor.validate(valor, key);
      }
    }
  }

  static validate(value, key) {
    const schema = this.getSchema();
    const rule = schema[key];
    if (!rule) return null;
    const { tipo, atributo = key, erro, formato, ...rest } = rule;
    const validators = require("../validators/validators");
    switch (tipo) {
      case "string":
        return validators.validateString(value, {
          atributo,
          erro_formato: erro,
          formato,
          ...rest,
        });
      case "number":
        return validators.validateNumber(value, atributo, erro);
      case "option":
        // Atualmente checando se existem predefinições no schema. Se houver valida com base nelas, se não, cai no validateOption como fallback.
        // Futuramente se livrar do método utils/validators/ValidateOption, definindo diretamente nos schemas e atualizando o método ModeloBase/ValidateBySchema
        if (Array.isArray(rule.opcoes)) {
          console.log("Opções válidas:", rule.opcoes);
          const normalizedValue = value.toLowerCase();
          const normalizedOptions = rule.opcoes.map((option) =>
            option.toLowerCase()
          );
          console.log("Normalized value:", normalizedValue);
          if (!normalizedOptions.includes(normalizedValue)) {
            throw new Error(
              erro ||
                `Atributo '${atributo}' inválido. Valores permitidos: ${rule.opcoes.join(
                  ", "
                )}.`
            );
          }
          return value;
        }
        // Fallback para lista centralizada
        return validators.validateOption(value, atributo);
      case "date":
        return validators.validateDate(value, atributo);
      case "foto":
        if (value === null || value === undefined || value === "") {
          return null;
        }
        if (typeof value === "string" && value.startsWith("data:image")) {
          return value; // Aceita base64 por enquanto
        }
        throw new Error(`Formato de imagem inválido para '${atributo}'.`);
      default:
        throw new Error(
          `Tipo de validação '${tipo}' não reconhecido para '${key}'`
        );
    }
  }
  // Método auxiliar (pode ser exportado para update/create)
  static validateBySchema(data = {}) {
    const validados = {};
    const schema = this.getSchema();
    for (const key in data) {
      if (key in schema) {
        validados[key] = this.validate(data[key], key);
      }
    }
    return validados;
  }
  static getValidKeys() {
    return Object.keys(this.getSchema());
  }
  static getSchema() {
    return this.#schema;
  }
  toJSON() {
    const json = {};
    for (const key of this.constructor.getValidKeys()) {
      json[key] = this[key];
    }
    return json;
  }
}

module.exports = ModeloBase;
