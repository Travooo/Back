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
      required: true,
      atributo: "usuario_id",
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
