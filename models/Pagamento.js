class Pagamento {
  constructor(valor, metodo_pagamento, status = "pendente", usuario_id) {
    if (!valor || !metodo_pagamento || !status || !usuario_id) {
      throw new Error("Campos obrigatórios ausentes ou inválidos.");
    }
    const numeroConvertido = Number(valor);
    if (isNaN(numeroConvertido) || numeroConvertido <= 0) {
      throw new Error(
        "Atributo 'valor' inválido. Deve ser um número positivo."
      );
    }
    if (typeof metodo_pagamento !== "string") {
      throw new Error("Atributo 'metodo_pagamento' inválido.");
    }
    const metodosPermitidos = ["credito", "debito", "pix", "boleto"];
    if (!metodosPermitidos.includes(metodo_pagamento)) {
      throw new Error("Atributo 'metodo_pagamento' inserido não existe.");
    }
    if (typeof status !== "string") {
      throw new Error("Atributo 'status' inválido.");
    }
    const statusPermitidos = ["pendente", "pago", "cancelado", "estornado"];
    if (!statusPermitidos.includes(status)) {
      throw new Error("Atributo 'status' inserido não existe.");
    }
    if (!Number.isInteger(usuario_id) || usuario_id <= 0) {
      throw new Error("Atributo 'usuario_id' inválido.");
    }
    this.valor = valor;
    this.metodo_pagamento = metodo_pagamento;
    this.status = status;
    this.usuario_id = usuario_id;
  }
}

module.exports = Pagamento;
