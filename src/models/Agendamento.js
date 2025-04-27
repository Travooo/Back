const ModeloBase = require("./ModeloBase");

class Agendamento extends ModeloBase {
  static #schema = {
    servico_id: {
      tipo: "number",
      required: true,
      atributo: "servico_id",
    },
    usuario_id: {
      tipo: "number",
      required: true,
      atributo: "usuario_id",
    },
    horario: {
      tipo: "date",
      required: true,
      atributo: "horario",
    },
    detalhes: {
      tipo: "string",
      atributo: "detalhes",
      min: 10,
      max: 300,
    },
  };
  static getSchema() {
    return this.#schema;
  }
}

module.exports = Agendamento;
