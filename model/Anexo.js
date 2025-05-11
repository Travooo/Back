const ModeloBase = require("./ModeloBase");

class Anexo extends ModeloBase {
  static #schema = {
    // #: Privado
    entidade_id: {
      tipo: "number",
      required: true,
      atributo: "entidade_id",
      erro: "'entidade_id' deve ser um número válido.",
    },
    entidade_tipo: {
      tipo: "option",
      required: true,
      atributo: "entidade_tipo",
      min: 1,
      max: 63,
    },
    nome_arquivo: {
      tipo: "string",
      required: true,
      atributo: "nome_arquivo",
      min: 1,
      max: 255,
    },
    path: {
      tipo: "string",
      required: true,
      atributo: "path",
      min: 1,
      max: 500,
    },
    url_publica: {
      tipo: "string",
      required: true,
      atributo: "url_publica",
      min: 1,
      max: 500,
    },
  };
  static getSchema() {
    return this.#schema;
  }
}

module.exports = Anexo;
