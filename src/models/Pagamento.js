const ModeloBase = require("./ModeloBase");

class Pagamento extends ModeloBase {
  static #schema = {
    // #: Privado
    valor: {
      tipo: "number",
      required: true,
      atributo: "valor",
      erro: "Deve ser um número positivo com até duas casas decimais.",
    },
    metodo_pagamento: {
      tipo: "option",
      required: true,
      atributo: "metodo_pagamento",
      opcoes: ["credito", "debito", "pix", "boleto"],
      erro: "Método de pagamento inválido. Use: credito, debito, pix ou boleto.",
    },
    status: {
      tipo: "option",
      required: true,
      atributo: "status",
      opcoes: ["pendente", "pago", "cancelado", "estornado"],
      erro: "Status inválido. Use: pendente, pago, cancelado ou estornado.",
    },
    usuario_id: {
      tipo: "number",
      required: true,
      atributo: "usuario_id",
    },
  };
  static getSchema() {
    return this.#schema;
  }
}

module.exports = Pagamento;
