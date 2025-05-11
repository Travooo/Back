class Cupom {
    constructor({id, estabelecimento_id, usuario_id, descricao, created_at, expiration, nome}) {
        if (id !== undefined) {
            this.id = id;
          }
        this.estabelecimento_id = estabelecimento_id;
        this.usuario_id = usuario_id;
        this.descricao = descricao;
        this.created_at = created_at;
        this.expiration = expiration;
        this.nome = nome;
    }
}

module.exports = Cupom;