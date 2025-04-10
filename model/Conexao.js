class Conexao {
    constructor({ id, usuario1_id, usuario2_id, data_conexao }) {
        if (id !== undefined) {
            this.id = id;
        }
        this.usuario1_id = usuario1_id;
        this.usuario2_id = usuario2_id;
        this.data_conexao = data_conexao;
    }
}

module.exports = Conexao;