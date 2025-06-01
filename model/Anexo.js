const ModeloBase = require("./ModeloBase");


class Anexo extends ModeloBase {
  static #schema = {
    entidade_id: {
      tipo: "number",
      required: true,
      atributo: "entidade_id",
    },
    entidade_tipo: {
      tipo: "string",
      required: true,
      atributo: "entidade_tipo",
      min: 1,
      max: 255,
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
      max: 255,
    },
    mimetype: {
      tipo: "option",
      required: true,
      atributo: "mimetype",
    },
    tamanho: {
      tipo: "number",
      required: true,
      atributo: "tamanho",
    },
    url_publica: {
      tipo: "string",
      atributo: "url_publica",
      min: 1,
      max: 255,
    },
  };

  static getSchema() {
    return this.#schema;
  }
}

module.exports = Anexo;
