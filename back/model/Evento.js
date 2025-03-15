const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

class Evento {
    constructor(id_evento = null, id_usuario, id_usuario_organizacao, nome, data, descricao) {
        this.id_evento = id_evento;
        this.id_usuario = id_usuario;
        this.id_usuario_organizacao = id_usuario_organizacao;
        this.nome = nome;
        this.data = data;
        this.descricao = descricao;
    }
}

module.exports = Evento;