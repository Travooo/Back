const ModeloBase = require("./ModeloBase");

class LocalVisitado extends ModeloBase {
  static schema = {
    estabelecimento_id: {
      tipo: "number",
      required: true,
      atributo: "estabelecimento_id",
      erro: "'estabelecimento_id' deve ser um número válido.",
    },
    usuario_id: {
      tipo: "number",
      required: true,
      atributo: "usuario_id",
      erro: "'usuario_id' deve ser um número válido.",
    },
    data_visita: {
      tipo: "date",
      required: true,
      atributo: "data_visita",
      erro: "'data_visita' deve ser uma data válida.",
    },
  };

  static getSchema() {
    return this.schema;
  }
}

module.exports = LocalVisitado;
