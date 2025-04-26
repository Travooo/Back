const ModeloBase = require("./ModeloBase");

class LocalVisitado extends ModeloBase {
  static schema = {
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
    data_visita: {
      tipo: "date",
      required: true,
      atributo: "data_visita",
    },
  };
  static getSchema() {
    return this.schema;
  }
}

module.exports = LocalVisitado;
