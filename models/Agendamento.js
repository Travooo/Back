const { validateId, validateDate, validateDetalhes } = require('../utils/validators');

class Agendamento {
  constructor(estabelecimento_id, usuario_id, horario, detalhes = null) {
    this.estabelecimento_id = validateId(estabelecimento_id);
    this.usuario_id = validateId(usuario_id);
    this.horario = validateDate(horario);
    if (detalhes !== null && detalhes !== undefined) {
      this.detalhes = validateDetalhes(detalhes);
    }
  }
}

module.exports = Agendamento;
