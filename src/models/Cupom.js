const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

class Cupom {
    constructor(id_cupom = null, id_estabelecimento, id_usuario, descricao) {
        this.id_cupom = id_cupom;
        this.id_estabelecimento = id_estabelecimento;
        this.id_usuario = id_usuario;
        this.descricao = descricao;
    }
}

module.exports = Cupom;