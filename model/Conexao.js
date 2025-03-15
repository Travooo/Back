const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

class Conexao {
    constructor(id_conexao = null, id_usuario1, id_usuario2, data_conexao) {
        this.id_conexao = id_conexao;
        this.id_usuario1 = id_usuario1;
        this.id_usuario2 = id_usuario2;
        this.data_conexao = data_conexao;
    }
}

module.exports = Conexao;