class Estabelecimento {
  constructor(organizacao_id, nome, sobre, endereco, foto_local, horarios) {
    if (
      !organizao_id ||
      !nome ||
      !sobre ||
      !endereco ||
      !foto_local ||
      !horarios
    ) {
      throw new Error("Campos obrigatórios ausentes ou inválidos.");
    }
    if (!Number.isInteger(organizacao_id) || organizacao_id <= 0) {
      throw new Error("Atributo 'organizao_id' inválido.");
    }
    if (typeof nome !== "string") {
      throw new Error("Atributo 'nome' inválido.");
    }
    if (typeof sobre !== "string") {
      throw new Error("Atributo 'sobre' inválido.");
    }
    if (typeof endereco !== "string") {
      throw new Error("Atributo 'sobre' inválido.");
    }
    if (!(foto_local instanceof Buffer)) {
      throw new Error("Atributo 'foto_local' inválido.");
    }
    if (typeof horarios !== "string") {
      throw new Error("Atributo 'horarios' inválido.");
    }

    this.organizacao_id = organizacao_id;
    this.nome = nome;
    this.sobre = sobre;
    this.endereco = endereco;
    this.foto_local = foto_local;
    this.horarios = horarios;
  }
}

module.exports = Estabelecimento;
