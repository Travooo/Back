class Avaliacao {
  constructor(
    estabelecimento_id,
    usuario_id,
    comentario = null,
    numero_estrelas,
    data_comentario = null
  ) {
    if (!estabelecimento_id || !usuario_id || !numero_estrelas) {
      throw new Error("Campos obrigatórios ausentes ou inválidos.");
    }
    if (!Number.isInteger(usuario_id) || usuario_id <= 0) {
      throw new Error("Atributo 'usuario_id' inválido.");
    }
    if (!Number.isInteger(estabelecimento_id) || estabelecimento_id <= 0) {
      throw new Error("Atributo 'estabelecimento_id' inválido.");
    }
    if (comentario !== null && typeof comentario !== "string") {
      throw new Error("Atributo 'comentario' deve ser uma string ou null.");
    }
    const numerosPermitidos = [1, 2, 3, 4, 5];
    if (!numerosPermitidos.includes(numero_estrelas)) {
      throw new Error("Atributo 'numero_estrelas' deve ser 1, 2, 3, 4 ou 5.");
    }
    if (
      (data_comentario !== null && !(data_comentario instanceof Date)) ||
      (data_comentario instanceof Date && isNaN(data_comentario.getTime()))
    ) {
      throw new Error(
        "Atributo 'data_comentario' deve ser um objeto Date ou null."
      );
    }
    this.estabelecimento_id = estabelecimento_id;
    this.usuario_id = usuario_id;
    this.comentario = comentario;
    this.numero_estrelas = numero_estrelas;
    this.data_comentario = data_comentario;
  }
}

module.exports = Avaliacao;
