const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

class Avaliacao {
    constructor(id_avaliacao = null, id_estabelecimento, id_usuario, comentario = null, numero_estrelas) {
        this.id_avaliacao = id_avaliacao;
        this.id_estabelecimento = id_estabelecimento;
        this.id_usuario = id_usuario;
        this.comentario = comentario;
        this.numero_estrelas = numero_estrelas;
    }
}

module.exports = Avaliacao;