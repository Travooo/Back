const { validateValor, validateMetodoPagamento, validateStatus, validateId } = require('../utils/validators');

class Pagamento {
  constructor(valor, metodo_pagamento, status = 'pendente', usuario_id) {
    this.valor = validateValor(valor);
    this.metodo_pagamento = validateMetodoPagamento(metodo_pagamento);
    this.status = validateStatus(status);
    this.usuario_id = validateId(usuario_id);
  }
}

module.exports = Pagamento;
