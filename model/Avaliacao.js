const ModeloBase = require("./ModeloBase");

class Avaliacao extends ModeloBase {
  static #schema = {
    servico_id: {
      tipo: "number",
      required: true,
      atributo: "estabelecimento_id",
    },
    usuario_id: {
      tipo: "number",
      required: false, // ← agora opcional
      atributo: "usuario_id",
    },
    organizacao_id: {
      tipo: "number",
      required: true, // ← agora obrigatório
      atributo: "organizacao_id",
    },
    comentario: {
      tipo: "string",
      required: true,
      atributo: "comentario",
      min: 4,
      max: 100,
    },
    numero_estrelas: {
      tipo: "number",
      required: true,
      atributo: "numero_estrelas",
    },
    data_comentario: {
      tipo: "date",
      required: true,
      atributo: "data_comentario",
    },
  };

  static getSchema() {
    return this.#schema;
  }
}

module.exports = Avaliacao;
