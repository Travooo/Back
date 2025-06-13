class Notificacoes {
    constructor({ id, titulo, descricao, usuario_id, created_at, organizacao_id}) {
        if (id !== undefined) {
            this.id = id;
        }
        this.titulo = titulo;
        this.descricao = descricao;
        this.usuario_id = usuario_id;
        this.organizacao_id = organizacao_id;
        this.created_at = created_at;
    }
}

module.exports = Notificacoes;