class Agendamento {
  constructor(estabelecimento_id, usuario_id, horario, detalhes = null) {
    if (!estabelecimento_id || !usuario_id || !horario) {
      throw new Error("Campos obrigatórios ausentes ou inválidos.");
    }
    if (!Number.isInteger(estabelecimento_id) || estabelecimento_id <= 0) {
      throw new Error("Atributo 'estabelecimento_id' inválido.");
    }
    if (!Number.isInteger(usuario_id) || usuario_id <= 0) {
      throw new Error("Atributo 'usuario_id' inválido.");
      git;
    }
    if (!(horario instanceof Date) || isNaN(horario.getTime())) {
      throw new Error(
        "Atributo 'horario' deve ser um objeto date válido no formato ISO ('2025-04-10T15:30:00Z')"
      );
    }
    if (detalhes !== null && typeof detalhes !== "string") {
      throw new Error("Atributo 'detalhes' deve ser uma string ou null.");
    }
    this.estabelecimento_id = estabelecimento_id;
    this.usuario_id = usuario_id;
    this.horario = horario;
    this.detalhes = detalhes;
  }
}

module.exports = Agendamento;
