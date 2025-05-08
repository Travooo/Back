const ModeloBase = require("./ModeloBase");

class Anexo extends ModeloBase {
  static #schema = {
    // #: Privado
    estabelecimento_id: {
      tipo: "number",
      required: true,
      atributo: "estabelecimento_id",
      erro: "'estabelecimento_id' deve ser um número válido.",
    },
    entidade: {
      tipo: "string",
      required: true,
      atributo: "entidade",
      min: 1,
      max: 63,
    },
    tipo_anexo: {
      tipo: "option",
      required: true,
      atributo: "tipo_anexo",
      opcoes: ["image/jpeg", "image/png"],
      erro: "Tipo de anexo não permitido. Use apenas JPEG ou PNG.",
    },
  };
  static getSchema() {
    return this.#schema;
  }
}

module.exports = Usuario;
