class Conexao {
  constructor(usuario1_id, usuario2_id, data_conexao) {
    if (!usuario1_id || !usuario2_id || data_conexao) {
      throw new Error("Campos obrigatórios ausentes ou inválidos.");
    }
    if (typeof usuario1_id !== "number") {
      throw new Error("Atributo 'usuario1_id' inválido.");
    }
    if (typeof usuario2_id !== "number") {
      throw new Error("Atributo 'usuario2_id' inválido.");
    }
    if (!(data_conexao instanceof Date)) {
      throw new Error(
        "Atributo 'data_conexao' deve ser um objeto Date ou null."
      );
    }
    this.id_usuario1 = usuario1_id;
    this.id_usuario2 = usuario2_id;
    this.data_conexao = data_conexao;
  }
}

module.exports = Conexao;
