class Pagamento {
  constructor(valor, metodo_pagamento, status, id_usuario) {
    if (!id_usuario || !valor || !metodo_pagamento || !status) {
      throw new Error("Campos obrigatórios ausentes ou inválidos.");
    }
    if (typeof valor !== "number" || valor <= 0) {
      throw new Error("O valor do pagamento deve ser um número positivo.");
    }
    const statusPermitidos = ["pendente", "pago", "cancelado", "estornado"];
    if (!statusPermitidos.includes(status)) {
      throw new Error("Status inválido.");
    }
    this.valor = valor;
    this.metodo_pagamento = metodo_pagamento;
    this.status = status;
    this.id_usuario = id_usuario;
  }
}

module.exports = Pagamento;
