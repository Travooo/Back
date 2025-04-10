class Favorito {
    constructor({id, usuario_id, estabelecimento_id, created_at}) {
        if (id !== undefined) {
            this.id = id;
          }
        this.usuario_id = usuario_id;
        this.estabelecimento_id = estabelecimento_id;
        this.created_at = created_at;
    }
}

module.exports = Favorito;