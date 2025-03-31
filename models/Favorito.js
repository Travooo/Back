class Favorito {
    constructor(id_favorito = null, id_usuario, id_estabelecimento) {
        this.id_favorito = id_favorito;
        this.id_usuario = id_usuario;
        this.id_estabelecimento = id_estabelecimento;
    }
}

module.exports = Favorito;